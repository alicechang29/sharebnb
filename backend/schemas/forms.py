from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import InputRequired, Email, Length
from flask_wtf.file import FileField
# ^^ has a FileRequired


class UserRegistrationForm(FlaskForm):
    """Form for validating user registration inputs."""

    username = StringField(
        "username",
        validators=[
            InputRequired()
        ]
    )

    email = StringField(
        "email",
        validators=[
            InputRequired(),
            Email(),
        ]
    )

    password = StringField(
        "password",
        validators=[
            InputRequired(),
            Length(min=8)
        ]
    )

    first_name = StringField(
        "first_name",
        validators=[
            InputRequired()
        ]
    )

    last_name = StringField(
        "last_name",
        validators=[
            InputRequired()
        ]
    )

    user_image = FileField(
        "user_image"
    )


class UserAuthForm(FlaskForm):
    """Form for validating user auth inputs."""

    email = StringField(
        "email",
        validators=[
            InputRequired(),
            Email(),
        ]
    )

    password = StringField(
        "password",
        validators=[
            InputRequired(),
            Length(min=8)
        ]
    )


class NewListingForm(FlaskForm):
    """Form for validating new listing inputs."""

    title = StringField(
        "title",
        validators=[
            InputRequired()
        ]
    )

    description = TextAreaField(
        "description"
    )

    password = StringField(
        "price",
        validators=[
            InputRequired(),
            # TODO: add in currency
        ]
    )

    zipcode = StringField(
        "zipcode",
        validators=[
            InputRequired(),
            Length(max=10)
            # TODO: how to validate this?
        ]
    )

    listing_image = FileField(
        "listing_image"
    )
