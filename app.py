import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from models import db, dbx, Listing, Image, User

from util.helpers import (upload_file_to_s3,
                          create_presigned_url,
                          create_object_key)

# NOTES: study this again...
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

load_dotenv()
db.init_app(app)

S3_BUCKET = "sharebnb-38"


@app.post("/api/add-listing")
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


@app.get("/api/listings")
def get_all_listings():

    print("RUNNING GET ALL LISTINGS REQUEST")
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

    # seralized_listings

    return jsonify(listings=serialized_listings_w_images)


@ app.get("/api/listings/<int:id>")
def get_listing(id):

    print("RUNNING GET REQUEST")
    object_key = "potato_salad.jpeg"
    # would normally query the database using listing id

    image_url = create_presigned_url(
        bucket_name=S3_BUCKET, object_key=object_key)

    return jsonify({"image_url": image_url})
