import os
import boto3
from dotenv import load_dotenv

from flask import Flask
from flask_debugtoolbar import DebugToolbarExtension

from models import db, dbx

# NOTES: study this again...
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", "postgresql:///sharebnb"
)
app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_RECORD_QUERIES"] = True
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")

load_dotenv()

app.config['aws_access_key_id'] = os.environ['aws_access_key_id']
app.config['aws_secret_access_key'] = os.environ['aws_secret_access_key']

S3_BUCKET = "sharebnb-38"

db.init_app(app)


@app.post("/images")
def upload_image(image_data):

    body = image_data
    key = ""

    response = multipart_upload_part.upload(

    )

    # def upload_content(key: str, origin_file_path: str):
    # s3 = boto3.resource('s3',
    #                     aws_access_key_id=app.config['aws_access_key_id'],
    #                     aws_secret_access_key=app.config['aws_secret_access_key'])
    # s3.Bucket(S3_BUCKET).upload_file(origin_file_path, key)
