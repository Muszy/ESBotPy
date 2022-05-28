from pony import orm
from ..db import db


class QuoteEntity(db.Entity):
    guild_id = orm.Required(int, size=64)
    quote_id = orm.Required(int, unsigned=True)
    orm.PrimaryKey(guild_id, quote_id)
    text = orm.Required(str)
    called = orm.Required(int, default=0, unsigned=True)
