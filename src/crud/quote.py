from pony.orm import db_session

from ..models.quote import QuoteEntity


class QuoteCRUD:
    @db_session
    def create(guild_id: int, text: str) -> QuoteEntity:
        quote_id = QuoteEntity.select(guild_id=guild_id).count() + 1
        return QuoteEntity(guild_id=guild_id, quote_id=quote_id, text=text)

    @db_session
    def read(guild_id: int, quote_id: int = None) -> str:
        if quote_id is None:
            quote = QuoteEntity.select(guild_id=guild_id).random(1)[0]
        else:
            quote = QuoteEntity.get(guild_id=guild_id, quote_id=quote_id)

        quote.called += 1
        return quote

    @db_session
    def count(guild_id: int) -> int:
        return QuoteEntity.select(guild_id=guild_id).count()
