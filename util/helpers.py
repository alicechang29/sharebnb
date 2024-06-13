import boto3
import logging
import uuid
import os
from dotenv import load_dotenv
from flask import Flask


from botocore.exceptions import ClientError

load_dotenv()

app = Flask(__name__)

S3_BUCKET = "sharebnb-38"

S3_CLIENT = boto3.client(
    "s3",
    aws_access_key_id=os.environ['aws_access_key_id'],
    aws_secret_access_key=os.environ['aws_secret_access_key']
)


def upload_file_to_s3(object_key, file, acl="public-read"):
    # filename = secure_filename(file.filename)
    try:
        S3_CLIENT.upload_fileobj(file, S3_BUCKET, object_key)
        print("added file to S3", file)
        return file

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e


def create_presigned_url(bucket_name, object_key, expiration=3600):
    """Generate a presigned URL to share an S3 object

    :param bucket_name: string
    :param object_name: string
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Presigned URL as string. If error, returns None.
    """

    # Generate a presigned URL for the S3 object

    print("CALLING PRE-SIGNED URL")
    try:
        response = S3_CLIENT.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': object_key},
            ExpiresIn=expiration)
        print("CREATING PRE SIGNED URL", response)
        return response

    except ClientError as e:
        logging.error(e)
        return None


def create_object_key():
    object_key = str(uuid.uuid4())

    return object_key
