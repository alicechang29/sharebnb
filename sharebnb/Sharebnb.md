Frontend: JS/React 
Backend: Flask 

Goals 
- review core concepts 
- learn websockets/maps 

# P0 
## Backend 

### Data Model 

- Data Model -- get code review here 
- Data Model tests 
- Data Validation (WTForms validator)


Users Model 

Listing Model 

File Model 

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
- how to store our secret key 
- how to submit a form that uploads a file 
- how to get the file from the server
- how to store the file in S3 
	- https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/put_object.html#
	- 
	- storing images: 
		- Listing1/Image1
		- Listing1/Image2 
		- Listing2/Image1 
- how to retrieve the file from S3 
	- what key would we store on the Listing for the image? 
	- How to retrieve the image?? 
- how is the file stored on the server ?? 
- how to send send that file to the client 


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