import boto3

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
s3 = boto3.client(
    's3',
    aws_access_key_id=app.config['aws_access_key_id'],
    aws_secret_access_key=app.config['aws_secret_access_key'])
response = s3.list_buckets()

# Output the bucket names
print('Existing buckets:')
for bucket in response['Buckets']:
    print(f'  {bucket["Name"]}')


def upload_content(key: str, origin_file_path: str):
    s3 = boto3.resource('s3',
                        aws_access_key_id=app.config['aws_access_key_id'],
                        aws_secret_access_key=app.config['aws_secret_access_key'])
    s3.Bucket(S3_BUCKET).upload_file(origin_file_path, key)


# NOTE: be careful to not put a "/" in front of an object key if don't want folder
# upload_content('potato_salad3.jpeg', 'potato_salad.jpeg')


def download_content(key: str, destination_file_path: str):
    s3 = boto3.resource('s3', aws_access_key_id=app.config['aws_access_key_id'],
                        aws_secret_access_key=app.config['aws_secret_access_key'])
    s3.Bucket(S3_BUCKET).download_file(key, destination_file_path)


download_content('/potato_salad.jpeg', '/')
