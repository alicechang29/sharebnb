from app import app
from models import db, Listing, User, Image

app.app_context().push()

db.drop_all()
db.create_all()

user1 = User(
    username="alice"
)


user2 = User(
    username="andrea"
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
    listing_id=1
)

db.session.add_all([image1])
db.session.commit()
