#! /usr/bin/env python3
# -*- coding: utf-8 -*-

import logging

from nextcord import Intents

from src.bot import Daikichi
from src.config import DISCORD

logger = logging.getLogger(__name__)


def main(args):
    logging.basicConfig(level=logging.INFO)

    command_prefix = ['!', '%']
    intents = Intents.default()
    intents.members = True

    bot = Daikichi(command_prefix=command_prefix, intents=intents)
    bot.run(DISCORD['client_token'])


if __name__ == '__main__':
    import sys

    try:
        sys.exit(main(()))
    except Exception as exception:
        logger.exception(exception)
        sys.exit(1)
