from nextcord.embeds import Embed
from nextcord.ext.commands import Bot, Cog, Context, command
from typing import Union

from ..utils.colors import ChatColor, ErrorsColor
from ..crud.weather import WeatherCRUD, Response

import logging

logger = logging.getLogger(__name__)


class WeatherCog(Cog):
    def __init__(self, bot: Bot, **kwargs):
        super().__init__(**kwargs)
        self.bot = bot

    @command(help='To look up the weather somewhere, just use `!weather <city/zip>`.')
    async def weather(self, ctx: Context, *, query: Union[int, str]) -> None:
        try:
            response: Response = await WeatherCRUD.get_weather(query)
            embed = Embed(
                color=ChatColor,
                title=response.title,
                description=response.description,
            )
            embed.set_thumbnail(url='http://i.imgur.com/7TL0t99.png')
            await ctx.send(embed=embed)
        except Exception as exception:
            logger.error(exception)
            embed = Embed(
                color=ErrorsColor,
                title="Error:",
                description="Please use the format `!weather <city/zip>`.",
            )
            embed.set_thumbnail(url='http://i.imgur.com/7TL0t99.png')
            await ctx.send(embed=embed, delete_after=4.0)
            await ctx.message.delete(delay=1.5)

def setup(bot: Bot):
    bot.add_cog(WeatherCog(bot))
