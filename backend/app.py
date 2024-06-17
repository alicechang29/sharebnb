import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import json
import logging
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import (create_access_token,
                                get_jwt,get_jwt_identity,
                                unset_jwt_cookies,
                                jwt_required,
                                JWTManager)


from models import db, dbx, Listing, Image, User

from util.helpers import (upload_file_to_s3,
                          create_presigned_url,
                          create_object_key,
                          assign_url_for_images)

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", "postgresql:///sharebnb"
)
app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_RECORD_QUERIES"] = True
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config['aws_access_key_id'] = os.environ['aws_access_key_id']
app.config['aws_secret_access_key'] = os.environ['aws_secret_access_key']
app.config['JWT_SECRET_KEY'] = os.environ['JWT_SECRET_KEY']


load_dotenv()
db.init_app(app)
jwt = JWTManager(app)
S3_BUCKET = "sharebnb-38"


@app.post("/add-listing")
@jwt_required()
def add_listing():
    """ Given listing data from form submit,
    Generates an image_object_key for storing image in S3 Bucket
    Uploads image to S3 Bucket

    Adds new listing to Listing table in DB
    Adds new image to Images table in DB
    """

    # send image to S3
    listing_images = request.files['image']
    print("upload listing images", listing_images)

    image_object_key = create_object_key()
    upload_file_to_s3(object_key=image_object_key, file=listing_images)

    # save data to database
    listing_data = request.form

    title = listing_data["title"]
    description = listing_data["description"]
    price = listing_data["price"]
    zipcode = listing_data["zipcode"]

    new_listing = Listing.create(
        title=title,
        description=description,
        price=price,
        zipcode=zipcode)

    listing_id = new_listing.id

    Image.create(
        image_object_key=image_object_key,
        listing_id=listing_id
    )

    return jsonify({"listing_upload": "ok!"})


@app.get("/listings")
def get_all_listings():
    """Gets all listings from DB and query for all images related to each
    listing.
    Generates a temporary pre-signed URL for each image
    Returns json of:
    [{id, title, description, price, zipcode, images: [image_url,...]}]
    """
    q_listings = db.select(Listing)
    listings = dbx(q_listings).scalars().all()
    serialized_listings = [listing.serialize() for listing in listings]

    serialized_listings_w_images = []

    for listing in serialized_listings:
        print("in for loop with listing:", listing)

        id = listing["id"]

        q_images_object_keys = db.select(Image.image_object_key).where(
            Image.listing_id == id)
        image_object_keys = dbx(q_images_object_keys).scalars().all()

        image_urls = []

        for image_object_key in image_object_keys:
            image_url = create_presigned_url(image_object_key)
            image_urls.append(image_url)

        listing["images"] = image_urls

        serialized_listings_w_images.append(listing)

    return jsonify(listings=serialized_listings_w_images)


@app.get("/listings/<int:listing_id>")
def get_single_listing(listing_id):
    """Return JSON of a single listing
    {'listing': id, title, description, price, zipcode, images: [image_url,...]}
    """

    # get listing by id
    listing = db.get_or_404(Listing, listing_id)
    serialized_listing = listing.serialize()

    # get all images for the listing
    q_images_object_keys = db.select(Image.image_object_key).where(
        Image.listing_id == listing_id)
    image_object_keys = dbx(q_images_object_keys).scalars().all()
    image_urls = assign_url_for_images(image_object_keys)

    # add list of images to serialized_listing
    serialized_listing["images"] = image_urls

    return jsonify(listing=serialized_listing)

@app.post("/token")
def create_token():
    """
    POST /token:  { username, password } => { token }
    Returns JWT token which can be used to authenticate further requests.
    Authorization required: none
    """
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if not username or not password:
        logging.warning("Missing username or password")
        return jsonify({"msg": "Missing username or password"}), 400

    if User.authenticate(username, password):
        access_token = create_access_token(identity=username)
        response = {"access_token": access_token}
        return jsonify(response)

    else:
        logging.warning(f"Authentication failed for user: {username}")
        return jsonify({"msg": "Wrong username or password"}), 401



@app.post("/logout")
def logout():
    """
    POST /logout
    Removes JWT token from session.
    """
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.post("/register")
def register():
    """
    POST /register
    Registers user and returns JWT token which can be used to authenticate
    further requests.
    """

    user_image = request.files['image']
    # send image to S3
    if not user_image:
        image_object_key = None
    else:
        user_profile_img = user_image
        print("upload user profile image", user_profile_img)

        image_object_key = create_object_key()
        upload_file_to_s3(object_key=image_object_key, file=user_profile_img)

    # save user data to database

    user_data = request.form
    #FIXME: maybe use WTFORMS to validate the info
    #https://www.reddit.com/r/vuejs/comments/16oqerq/validating_forms_with_flask_backend/

    username = user_data["username"]
    password = user_data["password"]
    email = user_data["email"]
    first_name = user_data["first_name"]
    last_name = user_data["last_name"]
    image_object_key = image_object_key

    User.register(
        username,
        password,
        email,
        first_name,
        last_name,
        image_object_key
        )

    print("Saving to DB")

    return jsonify({"msg": f"{username} registered."}), 200