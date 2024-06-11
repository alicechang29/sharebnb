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


# bucket: s3 bucket name
# key: s3 file path (eg: test/123/a.jpg)
# file_path: local file path
# def upload_img(bucket: S3_BUCKET, key: str, file_path: str):
#     s3.upload_file(Bucket=bucket, Key=key, Filename=file_path, ExtraArgs={
#         'ContentType': "image/jpeg"})
#     os.remove(file_path)
#     print("upload image {} success".format(file_path))

# print("!!!!!!", S3_BUCKET.Bucket(S3_BUCKET))
s3 = boto3.resource('s3',
                    aws_access_key_id=app.config['aws_access_key_id'],
                    aws_secret_access_key=app.config['aws_secret_access_key'])

print("!!!!!s3", s3)
s3.Bucket(S3_BUCKET).upload_file(
    '/Users/alicechang/rithm/sharebnb/potato_salad.jpeg', 'potato_salad2.jpeg')
