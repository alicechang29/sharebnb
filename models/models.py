"""Listing Model for ShareBnB"""

# TODO: discuss decision on keeping all models in one file

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
dbx = db.session.execute


class Listing(db.Model):
    """Lising"""

    __tablename__ = "listings"

    id = db.mapped_column(
        db.Integer,
        db.Identity(),
        primary_key=True
    )

    host_username = db.mapped_column(
        db.String(100),
        db.ForeignKey('username', ondelete='CASCADE'),
        nullable=False
    )

    description = db.mapped_column(
        db.Text,
        nullable=False
    )

    title = db.mapped_column(
        db.String(500),
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
    def create(cls, id, host_username, description, title, price, zipcode):
        """Create a listing.

        Add listing to the database
        """

        listing = Listing(
            host_username=host_username,
            title=title,
            description=description,
            price=price,
            zipcode=zipcode
        )

        db.session.add(listing)
        db.session.commit()
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
