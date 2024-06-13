from app import app
from models import db, Listing, User, Image

app.app_context().push()

db.drop_all()
db.create_all()

DEFAULT_USER = User(
    username="default_username",
    password="password",
    email="default_user@123.com",
    first_name="default_user_first",
    last_name="default_user_last",
    zipcode="12345"
)

test_user1 = User(
    username="alice",
    password="password",
    email="alice@123.com",
    first_name="Alice",
    last_name="C",
    zipcode="12345"
)


test_user2 = User(
    username="andrea",
    password="password",
    email="andrea@123.com",
    first_name="Andrea",
    last_name="J",
    zipcode="12345"
)

db.session.add_all([DEFAULT_USER, test_user1, test_user2])
db.session.commit()

test_listing1 = Listing(
    host_username="alice",
    title="Home in Seattle",
    description="my home",
    price=100,
    zipcode=12345
)

test_listing2 = Listing(
    host_username="andrea",
    title="Home in LA",
    description="my home",
    price=200,
    zipcode=23456
)

test_listing3 = Listing(
    host_username="alice",
    title="Home in Seattle",
    description="my home #2",
    price=200,
    zipcode=12345
)


db.session.add_all([test_listing1, test_listing2, test_listing3])
db.session.commit()


test_image1 = Image(
    image_object_key="random_object_key_1",
    listing_id=1
)

test_image2 = Image(
    image_object_key="random_object_key_2",
    listing_id=1
)

db.session.add_all([test_image1, test_image2])
db.session.commit()
