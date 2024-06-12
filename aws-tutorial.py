import boto3
import logging
from botocore.exceptions import ClientError

# import configparser
import os
from dotenv import load_dotenv
from flask import Flask

load_dotenv()

app = Flask(__name__)

app.config['aws_access_key_id'] = os.environ['aws_access_key_id']
app.config['aws_secret_access_key'] = os.environ['aws_secret_access_key']


S3_BUCKET = "sharebnb-38"

# Retrieve the list of existing buckets
# TODO: what is the .client fn

# NOTES: creating an URL for pulling an object s3
S3_CLIENT = boto3.client(
    's3',
    aws_access_key_id=app.config['aws_access_key_id'],
    aws_secret_access_key=app.config['aws_secret_access_key'])
response = S3_CLIENT.list_buckets()


def create_presigned_url(bucket_name, object_name, expiration=3600):
    """Generate a presigned URL to share an S3 object

    :param bucket_name: string
    :param object_name: string
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Presigned URL as string. If error, returns None.
    """

    # Generate a presigned URL for the S3 object

    try:
        response = S3_CLIENT.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': object_name},
            ExpiresIn=expiration)

    except ClientError as e:
        logging.error(e)
        return None

    print("CREATING PRE SIGNED URL", response)
    return response


create_presigned_url(S3_BUCKET, 'potato_salad.jpeg')


# Output the bucket names
print('Existing buckets:')
for bucket in response['Buckets']:
    print(f'  {bucket["Name"]}')


# FIXME: the origin file path should be the image object
def upload_content(key: str, origin_file_path: str):
    s3 = boto3.resource('s3',
                        aws_access_key_id=app.config['aws_access_key_id'],
                        aws_secret_access_key=app.config['aws_secret_access_key'])
    s3.Bucket(S3_BUCKET).upload_file(origin_file_path, key)


# NOTE: be careful to not put a "/" in front of an object key if don't want folder
# upload_content('potato_salad3.jpeg', 'potato_salad.jpeg')


def download_content(key: str):
    # s3 = boto3.resource('s3', aws_access_key_id=app.config['aws_access_key_id'],
    #                     aws_secret_access_key=app.config['aws_secret_access_key'])
    # s3.Bucket(S3_BUCKET).download_file(key, destination_file_path)
    response = boto3.client.get_object(
        Bucket=S3_BUCKET,
        Key=key,
    )
    print("RESPONSEEEE", response)
    return response


def downloadFile():
    S3_CLIENT.Bucket(S3_BUCKET).download_file('potato_salad.jpeg')
    print(
        f'File potato_salad.jpeg downloaded from s3 bucket {S3_BUCKET}')


# download_content('potato_salad.jpeg')
#  downloadFile()
