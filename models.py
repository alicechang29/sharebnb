"""Listing Model for ShareBnB"""

# TODO: discuss decision on keeping all models in one file

from flask_sqlalchemy import SQLAlchemy

from flask import Flask
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt()

db = SQLAlchemy()
dbx = db.session.execute


DEFAULT_IMAGE_URL = (
    "https://icon-library.com/images/default-user-icon/" +
    "default-user-icon-28.jpg")

TEST_HOST_USERNAME = "alice"


class Listing(db.Model):
    """Listing"""

    __tablename__ = "listings"

    id = db.mapped_column(
        db.Integer,
        db.Identity(),
        primary_key=True
    )

    host_username = db.mapped_column(
        db.String(100),
        db.ForeignKey('users.username', ondelete='CASCADE'),
        nullable=False,
        default=TEST_HOST_USERNAME
    )

    title = db.mapped_column(
        db.String(500),
        nullable=False
    )

    description = db.mapped_column(
        db.Text,
        nullable=False
    )

    price = db.mapped_column(
        db.Integer,
        nullable=False
    )

    zipcode = db.mapped_column(
        db.String(10),
        nullable=False
    )

    user = db.relationship(
        "User",
        back_populates="listings"
    )

    images = db.relationship(
        "Image",
        back_populates="listing",
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        """Serialize listing to a dict of listing info."""

        return {
            "id": self.id,
            "host_username": self.host_username,
            "description": self.description,
            "title": self.title,
            "price": self.price,
            "zipcode": self.zipcode
        }

    @classmethod
    def create(cls, title, description, price, zipcode):
        """Create a listing.

        Add listing to the database
        #FIXME: add host_username back into create
        """

        listing = Listing(
            host_username=TEST_HOST_USERNAME,
            title=title,
            description=description,
            price=price,
            zipcode=zipcode
        )

        db.session.add(listing)
        db.session.commit()

        print("listing created")
        return listing

# TODO: ask why we do db.sessio for add and a db query for delete??

    @classmethod
    def delete(self):
        """Delete a listing."""

        q = (db
             .delete(Listing)
             .filter_by(
                 id=self.id
             ))

        dbx(q)
        db.session.commit()

    @classmethod
    def update(self, updated_fields):
        """Update a listing

        updated_fields = {
            description: STRING,
            title: STRING,
            price: NUMERIC,
            zipcode: STRING
        }
        """

        listing = db.session.get(Listing, self.id)
        for key, value in updated_fields.items():
            listing[key] = value

        db.session.commit()


class User(db.Model):
    """User"""

    __tablename__ = "users"

    username = db.mapped_column(
        db.String(100),
        primary_key=True,
        nullable=False
    )

    password = db.mapped_column(
        db.String(100),
        nullable=False,
    )

    email = db.mapped_column(
        db.String(50),
        nullable=False,
        unique=True,
    )

    first_name = db.mapped_column(
        db.String(100),
        nullable=False
    )

    last_name = db.mapped_column(
        db.String(100),
        nullable=False
    )

    image_url = db.mapped_column(
        db.String(255),
        nullable=False,
        default=DEFAULT_IMAGE_URL,
    )

    zipcode = db.mapped_column(
        db.String(10),
        nullable=False
    )

    listings = db.relationship(
        "Listing",
        back_populates="user",
        cascade="all, delete-orphan")

    @classmethod
    def signup(cls, username, email, password, image_url=DEFAULT_IMAGE_URL):
        """Sign up user.

        Hashes password and adds user to session.
        """

        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        user = User(
            username=username,
            email=email,
            password=hashed_pwd,
            image_url=image_url,
        )

        db.session.add(user)
        return user

    @classmethod
    def authenticate(cls, username, password):
        """Find user with `username` and `password`.

        This is a class method (call it on the class, not an individual user.)
        It searches for a user whose password hash matches this password
        and, if it finds such a user, returns that user object.

        If this can't find matching user (or if password is wrong), returns
        False.
        """

        q = db.select(cls).filter_by(username=username)
        user = dbx(q).scalar_one_or_none()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False


class Image(db.Model):
    """Image"""

    __tablename__ = "images"

    image_object_key = db.mapped_column(
        db.String(1500),
        nullable=False,
        primary_key=True
    )

    listing_id = db.mapped_column(
        db.Integer,
        db.ForeignKey('listings.id', ondelete='CASCADE'),
        nullable=False
    )

    listing = db.relationship(
        "Listing",
        back_populates="images"
    )

    @classmethod
    def create(cls, listing_id, image_object_key):
        """Create an image.

        Add image to the database
        """

        image = Image(
            listing_id=listing_id,
            image_object_key=image_object_key
        )

        db.session.add(image)
        db.session.commit()

        print("listing created")
        return image
