from nextcord.embeds import Embed
from nextcord.ext.commands import Bot, Context, errors

from src.db import db
from src.utils.colors import ErrorsColor

from .config import DATABASE, DISCORD


class Daikichi(Bot):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        for cog in DISCORD['cogs']:
            try:
                self.load_extension(cog)
            except Exception as exception:
                print(f"Could not load extension {cog} due to {exception.__class__.__name__}: {exception}")
    
    async def on_ready(self):
        print(f"Logged on as {self.user} (ID: {self.user.id})")

        db.bind(provider=DATABASE['provider'], filename=DATABASE['filename'], create_db=True)
        db.generate_mapping(create_tables=True)

    async def on_command_error(self, ctx: Context, exception: errors.CommandError) -> None:
        embed = Embed(
            title='Error:',
            color=ErrorsColor,
            description=str(exception),
        )
        embed.set_thumbnail(url='http://i.imgur.com/7TL0t99.png')
        embed.set_footer(text=f"{ctx.author} should RTFM!")
        await ctx.send(embed=embed)
