<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/alicechang29/sharebnb">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">ShareBnB</h3>

  <p align="center">
    Sharebnb is an Airbnb clone created during my time at Rithm School with my partner, @ndrjao, built over the course of 4 days.
    The backend was built with Flask, WTForms, SQLAlchemy, PostgreSQL.
    The frontend was built with React and Javascript.
    Images are stored within AWS S3 buckets.

  </p>
</div>

<!-- GETTING STARTED -->

### Getting Started

To run this app locally:

1. Clone the repo

```sh
git clone https://github.com/alicechang29/sharebnb.git
```

2. cd into backend/
3. Start Python Virtual Environment `python3 -m venv venv`
4. Activate Venv and Pip install requirements

```sh
$ source venv/bin/activate
(venv) $ pip3 install -r requirements.txt
```

5. Start the Flask server `flask run -p 5001`
6. Open another terminal window
7. cd into frontend/
8. NPM install `npm i`
9. `npm run start`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### My Learnings

I learned a lot during this project, such as:

- How to setup and AWS S3 bucket along with AWS IAM user accounts and permissions
- It is possible to send multi-part forms using Insomnia (we did not know this initially and created an entire form in React to test if the image upload to S3 worked)
- Using the POST listings route as a "conductor function" to handle adding listings data to the database, generating a UUID for images uploaded in order to store it in S3, and uploading the image to S3
- Form data is sent to backend as an object, and if there are images, it will be within request.files

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/alicechang29/sharebnb.svg?style=for-the-badge
[contributors-url]: https://github.com/alicechang29/sharebnb/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/alicechang29/sharebnb.svg?style=for-the-badge
[forks-url]: https://github.com/alicechang29/sharebnb/network/members
[stars-shield]: https://img.shields.io/github/stars/alicechang29/sharebnb.svg?style=for-the-badge
[stars-url]: https://github.com/alicechang29/sharebnb/stargazers
[issues-shield]: https://img.shields.io/github/issues/alicechang29/sharebnb.svg?style=for-the-badge
[issues-url]: https://github.com/alicechang29/sharebnb/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/achang9
[product-screenshot]: sharebnb/AllListings.png
