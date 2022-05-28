import random
from pathlib import Path

from nextcord import File
from nextcord.embeds import Embed
from nextcord.ext.commands import Bot, Cog, Context, command

LIZARDS = list(Path('src/assets/lizard/').iterdir())

from ..utils.colors import ErrorsColor


class LizardCog(Cog):
    def __init__(self, bot: Bot, **kwargs):
        super().__init__(**kwargs)
        self.bot = bot

    @command(help='hehehehehahhaahaheuehe')
    async def lizard(self, ctx: Context) -> None:
        path = random.choice(LIZARDS)
        file = File(path)
        await ctx.send(file=file)


def setup(bot: Bot):
    bot.add_cog(LizardCog(bot))
