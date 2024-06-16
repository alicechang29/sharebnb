Frontend: JS/React
Backend: Flask

Goals

- review core concepts
- learn websockets/maps

1. get the form data (form values + file )
2. send to the flask server via api (make this generic)
3. on flask server:
4. send form data to db
5. send file to s3

Design Decision 
- making the view function the conductor 
- adds values to the DB 
- sends the image to the S3 bucket 

# TODO

**START HERE JUNE 15 **
- Create routes for User Auth 
	- Login 
	- Signup 
- Create middleware for User Auth 


**Running list of things to research/fix:** 
- FormData - what is it?? 
- Fix the Add New Listing Form - not using state 
	- How is this working right now?? 





**START HERE JUNE 14**
- fix the form 
- single listing component -- DONE 
- nav bar component -- DONE 
	- https://tailwindui.com/components/application-ui/navigation/navbars
- add tailwind to form  
	- https://tailwindui.com/components/application-ui/forms/form-layouts
- format homepage -- DONE 
- make seed data -- DONE 
- RIGHT AFTER LUNCH, 
	- Do redirect after form submit 
- PREPARE OUR DECK 
	- https://docs.google.com/document/d/1I1NsKqkLS4aaGmhdxzuI57jfyIOe390E7sAiewHgSUA/edit
	- our design flow 
- If there is time, add a search bar 


**START HERE JUNE 13**

- Fix Image Model -- DONE 
- Flask - POST route  -- DONE 
  - Create an object_key for image  -- DONE 
  - update DB with listing information including Image object key  -- DONE 
  - update S3 Bucket - DONE
- Flask - GET route by listing ID -- DONE 
  - query the DB Listing table for the listing data by listing id -- DONE 
  - query the DB Image table for all images by listing id -- DONE 
  - Map over the Image query -- DONE 
  - create the URL for each image -- DONE 
  - Put all the **listing data** into an object -- DONE 
	  - this needs to be serialized  -- DONE 
- Flask - GET route for ALL Listings -- DONE 
  - Send the **listing data ** to Front end -- DONE 

```
listing data = {
	listing id
	listing title
	images: [image url, image url...]
}
```

```
request.form =
ImmutableMultiDict(
  [('title', 'Title1'),
  ('description',
  'Test Description1'),
  ('price', '10000'),
  ('zipcode', '00000')])
```


- On React API
  - Create an async function to get a single listing data -- DONE 
  - Create async function to get all listing data -- DONE 
- On React App

  - Display the listing data for each item in listing obj

- discuss decision for holding all models in 1 file vs separate files for each

1. get the form data (form values + file )
2. send to the flask server via api (make this generic)
3. on flask server:
   1. send form data to db
   2. send file to s3

```
(Pdb) request.files
ImmutableMultiDict([('image', <FileStorage: 'toast.jpeg' ('image/jpeg')>)])

## pass in the FileStorage portion of tuple, not the whole thing


(Pdb) request.form
ImmutableMultiDict([('dummy', 'hello')])
```

**Image Upload Process**

1. User submits form
2. Upon form submission, it triggers POST request to Flask
3. [In Flask, receive the image object ](https://medium.com/@kurararu/sending-image-and-text-with-formdata-4025a1fdeedb)
4. [Convert the image object into binary](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/multipartuploadpart/upload.html#upload)
5. Create an object key for the image object
6. Store the object key in the DB
7. [Make PUT request to S3 and upload image ](https://stackoverflow.com/questions/49330601/upload-file-to-s3-with-put-and-form-data)

**Image Retrieval Process**

1. User visits page
2. Flask makes GET request to DB for listing info
3. Retrieve the array of Image Object Keys
4. Flask makes GET request to S3 for image and assigns a Temporary URL
5. Frontend awaits data
6. Client views data / images via Temp URL

# P0

## Backend

**START HERE!!!!! JUNE 12**

1. finish the data models
2. write the API's for querying the models

### Listings Data Model

- Listing ID - Primary key
- host username - Foreign Key (username)
- Description
- Title
- Price
- Zipcode

**Methods**

- Create
- Update
- Delete

- Get one listing by ID
- Get all listings
- Get filtered listings based on title & descriptions & zip
- Get all listings by username

### Image Data Model

- S3 Object Key - Primary Key
- Listing ID - Foreign Key

**Methods**

- Create (add to db, fix object key, add to S3)
- Update
- Delete

### Users Model

- User Name - Primary Key
- Password
- First Name
- Last Name
- Zip Code
- Address
- Phone
- Email

Methods:

- signup
- authenticate
-

### Messages Model - LATER

- Message ID
- toUser
- fromUser
- body

- Data Model -- get code review here
- Data Model tests
- Data Validation (WTForms validator)

SQL Queries

- To find hosts, join on listings/Users
- [TODO: look up the db models ](https://rithm-students-assets.s3.amazonaws.com/r38/resources/sqla-cheatsheet/handout/index.html?AWSAccessKeyId=AKIA6I7NF475LYNA7YJL&Signature=FD3%2By6NXR5craqh6gnaojz9Ta1o%3D&Expires=1718197118#many-to-many-relationships)

Write Helper functions / Middleware

Images:
Listing ID : [image{key, imageURL}, image, etc. ]

```
Image = {
	Image ID
	Listing ID
	Image URL
}
```

### API

- API routes to DB
  - Get
    - get all houses
    - Get by listing ID
  - Post
    - New House
    - Register new user
  - Patch
    - Update House
    - Update user profile
  - Delete
    - Delete house
    - Delete user
- Tests
  - https://rithm-students-assets.s3.amazonaws.com/r38/exercises/flask-warbler/handout/index.html?AWSAccessKeyId=AKIA6I7NF475LYNA7YJL&Signature=Htz3TQeDrIeKmBcnaJLNgmUu7FY%3D&Expires=1718174066#part-3-add-tests

WARBLER - app.py

- all tests for models, auth

### S3

- create an amazon acct -- DONE
- how to store our secret key -- DONE
- how to submit a form that uploads a file
- how to get the file from the server -- DONE
  - https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/object/get.html#S3.Object.get
- how to store the file in S3
  - https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/put_object.html#
  - storing images:
    - Listing1/Image1
    - Listing1/Image2
    - Listing2/Image1
      - give object key names: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
- how to retrieve the file from S3 -- DONE
  - what key would we store on the Listing for the image?
  - How to retrieve the image??
- how is the file stored on the server ??
- how to send send that file to the client -- DONE
  - Temporary URL

**When user submits form with image:**

- Assign the image an Object Key for S3
- Store the Object Key in own DB
- Send the Object (Key + Image) to S3

**When retrieving listing:**

- Get Object key from the DB
- Send the Object key to S3
- Await the file from S3

Do a test run

- using insomnia, can i post something in S3

Give server the credentials for writing/reading Bucket -- DONE

- individual user does not need access to the bucket
-

## Frontend

- Tailwind
  - https://v1.tailwindcss.com/components/cards
  - https://tailwindui.com/components/application-ui/elements/buttons
- single page with image and text
- form for submitting with image and text

Form Submission

- make AJAX call to server
- await the response
- Research: after form submission, what is best way to to retrieve the updated data?

# P1

Backend

- User Authentication

Frontend

- Search form
- User Sign up
- User Login

# P2

- User messaging

# P3

- Map
- Ordered by Date_Added
- Filtered by property type
