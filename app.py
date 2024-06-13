import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from models import db
from util.helpers import upload_file_to_s3, create_presigned_url

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
def upload_image():
    # breakpoint()
    file = request.files['image']
    listing_data = request.form
    object_key = "test1"

    print("!!!!BODY & KEY", file, object_key)
    print("!!! LISTING DATA", listing_data)

    upload_file_to_s3(object_key=object_key, file=file)

    return jsonify({"upload": "ok!"})

#  Need a get request to a listing ID
# should get generate presigned with a bucket_name and object_name
# no need to worry about bucket_name, object_name get from db
# use potato_salad.jpeg for test


@app.get("/api/listings/<int:id>")
def get_listing(id):

    print("RUNNING GET REQUEST")
    object_key = "potato_salad.jpeg"
    # would normally query the database using listing id

    image_url = create_presigned_url(
        bucket_name=S3_BUCKET, object_key=object_key)

    return jsonify({"image_url": image_url})
