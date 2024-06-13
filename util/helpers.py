
import boto3

import os
from werkzeug.utils import secure_filename

S3_BUCKET = "sharebnb-38"

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ['aws_access_key_id'],
    aws_secret_access_key=os.environ['aws_secret_access_key']
)


def upload_file_to_s3(key, file, acl="public-read"):
    # filename = secure_filename(file.filename)
    try:
        s3.upload_fileobj(file, S3_BUCKET, key)
        print("added file to S3", file)
        return file

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e
