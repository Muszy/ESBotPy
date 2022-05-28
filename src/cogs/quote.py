from nextcord.embeds import Embed
from nextcord.ext.commands import Bot, Cog, Context, command

from ..crud.quote import QuoteCRUD
from ..utils.colors import ChatColor, ErrorsColor

import logging

logger = logging.getLogger(__name__)


class QuoteCog(Cog):
    def __init__(self, bot: Bot, **kwargs):
        super().__init__(**kwargs)
        self.bot = bot

    @command(help='To add a quote, just use `!add [quote]`. Try using the format `"QUOTE" - *Person*`!')
    async def add(self, ctx: Context, *, text: str) -> None:
        try:
            quote = QuoteCRUD.create(ctx.guild.id, text)
            embed = Embed(
                color=ChatColor,
                description=f"Added quote #{quote.quote_id}.",
            )
            await ctx.send(embed=embed)
        except Exception as exception:
            logger.exception(exception)
            embed = Embed(
                color=ErrorsColor,
                title='Error:',
                description='You need a quote to add!',
            )
            embed.set_thumbnail(url='http://i.imgur.com/7TL0t99.png')
            await ctx.send(embed=embed)

    @command(help='To call a quote, just use `!call` or `!call [number]`.')
    async def call(self, ctx: Context, *, number: int = None) -> None:
        try:
            quote = QuoteCRUD.read(ctx.guild.id, number)
            embed = Embed(
                color=ChatColor,
                title=f"📣 Quote #{quote.quote_id}:",
                description=quote.text,
            )
            embed.set_footer(text=f'Called {quote.called} times')
            await ctx.send(embed=embed)
        except Exception as exception:
            logger.error(exception)
            embed = Embed(
                color=ErrorsColor,
                title='Error:',
                description=f'Quote {number} not found!',
            )
            embed.set_thumbnail(url='http://i.imgur.com/7TL0t99.png')
            await ctx.send(embed=embed)

    @command(help='To see how many quotes there are, just use `!qlength`.')
    async def qlength(self, ctx: Context) -> None:
        count = QuoteCRUD.count(ctx.guild.id)
        embed = Embed(
            color=ChatColor,
            description=f"There are currenty {count} quotes.",
        )
        await ctx.send(embed=embed)


def setup(bot: Bot):
    bot.add_cog(QuoteCog(bot))
