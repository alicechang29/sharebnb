import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from models import db, dbx, Listing, Image

from util.helpers import (upload_file_to_s3,
                          create_presigned_url,
                          create_object_key,
                          assign_url_for_images)

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


@app.post("/add-listing")
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


@ app.get("/listings/<int:listing_id>")
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
