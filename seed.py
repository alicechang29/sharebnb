from app import app
from models import db, Listing, User, Image

app.app_context().push()

db.drop_all()
db.create_all()

user1 = User(
    username="alice",
    password="password",
    email="alice@123.com",
    first_name="Alice",
    last_name="C",
    zipcode="12345"
)


user2 = User(
    username="andrea",
    password="password",
    email="andrea@123.com",
    first_name="Andrea",
    last_name="J",
    zipcode="12345"
)

db.session.add_all([user1, user2])
db.session.commit()

listing1 = Listing(
    host_username="alice",
    title="Home in Seattle",
    description="my home",
    price=100,
    zipcode=12345
)

listing2 = Listing(
    host_username="andrea",
    title="Home in LA",
    description="my home",
    price=200,
    zipcode=23456
)

listing3 = Listing(
    host_username="alice",
    title="Home in Seattle",
    description="my home #2",
    price=200,
    zipcode=12345
)


db.session.add_all([listing1, listing2])
db.session.commit()


image1 = Image(
    image_object_key="https://icon-library.com/images/default-user-icon/" +
    "default-user-icon-28.jpg",
    listing_id=1
)

image2 = Image(
    image_object_key="https://icon-library.com/images/default-user-icon/" +
    "default-user-icon-28.jpg",
    listing_id=1
)

db.session.add_all([image1, image2])
db.session.commit()
