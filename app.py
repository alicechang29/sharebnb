import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from models import db
from util.helpers import upload_file_to_s3

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


# FIXME: figure out how to get the image inside request.files


@app.post("/api/images")
def upload_image():
    # breakpoint()
    file = request.files['image']
    key = "test1"
    print("!!!!BODY & KEY", file, key)

    upload_file_to_s3(key=key, file=file)

    return jsonify({"upload": "ok!"})

    # upload_file_to_s3(key, body)

    # return jsonify({"test": "got here"})

    # def upload_content(key: str, origin_file_path: str):
    # s3 = boto3.resource('s3',
    #                     aws_access_key_id=app.config['aws_access_key_id'],
    #                     aws_secret_access_key=app.config['aws_secret_access_key'])
    # s3.Bucket(S3_BUCKET).upload_file(origin_file_path, key)
