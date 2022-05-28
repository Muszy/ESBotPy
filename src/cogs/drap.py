from io import BytesIO
from pathlib import Path

from matplotlib import font_manager
from nextcord import File
from nextcord.ext.commands import Bot, Cog, Context, command
from PIL import Image, ImageDraw, ImageFont

TEMPLATE = Path('src/assets/drap/coffee.png').resolve()
PROPERTIES = font_manager.FontProperties(family='sans-serif', weight='bold')
FONT = ImageFont.truetype(font_manager.findfont(PROPERTIES), size=48)
POSITION = (350, 1300)
BLACK = (0, 0, 0)

class DrapCog(Cog):
    def __init__(self, bot: Bot, **kwargs):
        super().__init__(**kwargs)
        self.bot = bot

    @command(help='To make a coffee mug, just use `!drap [optional text]`.')
    async def drap(self, ctx: Context, *, text: str = None) -> None:
        image = _draw(text)
        await ctx.send(file=image)


def _draw(text: str = None) -> File:
    if text is None:
        return File(TEMPLATE)

    with Image.open(TEMPLATE, mode='r') as infile, BytesIO() as outfile:
        editable = ImageDraw.Draw(infile)
        editable.multiline_text(xy=POSITION, text=text, fill=BLACK, font=FONT, anchor='mm', align='center')
        infile.save(outfile, format='PNG')
        outfile.seek(0)
        return File(outfile, filename='drap-gen.png')


def setup(bot: Bot):
    bot.add_cog(DrapCog(bot))
