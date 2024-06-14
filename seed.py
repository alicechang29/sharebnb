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
    username=DEFAULT_USER,
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
    host_username=DEFAULT_USER,
    title="Sky Haus - A-Frame Cabin",
    description="Cozy A-frame cabin located about 15 minutes from the slopes and at the doorstep of some of the best hikes the PNW has to offer.",
    price=359,
    zipcode=98288
)

test_listing2 = Listing(
    host_username=DEFAULT_USER,
    title="The Barbie Dreamhouse",
    description="A pink Victorian Style mansion, featuring tiled roofs and a tower at one spot. The Dreamhouse is primarily made of shades of pink, accented with white.",
    price=650,
    zipcode=12345
)

test_listing3 = Listing(
    host_username=DEFAULT_USER,
    title="Dreamy Beachfront Home w/Hot Tub and Views",
    description="Stylish, recently renovated, waterfront home nestled in Quartermaster Bay. Casual island luxury- cozy enough for a romantic getaway, roomy enough for entertaining friends and fam. ",
    price=875,
    zipcode=98013
)

test_listing4 = Listing(
    host_username=DEFAULT_USER,
    title="Persis tiny cabin. amazing outdoor shower.",
    description="Persis Cabin is the perfect getaway to escape the daily grind.  Our luxurious tiny cabin is situated on the river with amazing views of the river, and an exhilarating outdoor shower for a truly unique experience.",
    price=176,
    zipcode=92551
)

test_listing5 = Listing(
    host_username=DEFAULT_USER,
    title="Comfy Studio Flat",
    description="It is a perfect location, vibrant and lively area with plenty of bars and restaurants open until late.",
    price=115,
    zipcode=34901
)

test_listing6 = Listing(
    host_username=DEFAULT_USER,
    title="Home in Seattle",
    description="my home #2",
    price=200,
    zipcode=12345
)

test_listing7 = Listing(
    host_username=DEFAULT_USER,
    title="Take a Break at Wye Lake",
    description="itting directly on the lake, this home is fully remodeled and waiting for you to grab a drink and come relax on its huge private dock or take a spin around the lake in the provided pedal boat or kayaks! ",
    price=215,
    zipcode=87023
)

test_listing8 = Listing(
    host_username=DEFAULT_USER,
    title="Heartland Treehouse",
    description="Heartland Treehouse is perched between two massive fir trees overlooking a steep river canyon.  Sounds of a nearby waterfall will soothe you to bed at night and gently wake you in the morning.",
    price=254,
    zipcode=22390
)


db.session.add_all([
    test_listing1,
    test_listing2,
    test_listing3,
    test_listing4,
    test_listing5,
    test_listing6,
    test_listing7,
    test_listing8
])
db.session.commit()


test_image1 = Image(
    image_object_key="A-frame.jpg",
    listing_id=1
)

test_image2 = Image(
    image_object_key="barbie.png",
    listing_id=1
)

test_image3 = Image(
    image_object_key="beach_house.jpeg",
    listing_id=1
)

test_image4 = Image(
    image_object_key="cabin.jpeg",
    listing_id=1
)

test_image5 = Image(
    image_object_key="city.jpeg",
    listing_id=1
)

test_image6 = Image(
    image_object_key="lakeview.jpg",
    listing_id=1
)

test_image7 = Image(
    image_object_key="surf_shack.jpeg",
    listing_id=1
)

test_image8 = Image(
    image_object_key="tree_house.jpeg",
    listing_id=1
)


db.session.add_all([
    test_image1,
    test_image2,
    test_image3,
    test_image4,
    test_image5,
    test_image6,
    test_image7,
    test_image8
])
db.session.commit()
