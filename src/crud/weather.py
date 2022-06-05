import asyncio
from dataclasses import dataclass
from functools import partial
from typing import Dict, Union

from pyowm import OWM
from pyowm.weatherapi25.observation import Observation
from src.config import WEATHER

import logging

logger = logging.getLogger(__name__)

class AsyncOWM:
    def __init__(self, api_key: str, config: Dict = None):
        client = OWM(api_key, config)
        self.api = client.weather_manager()

    async def weather_at(self, query: Union[str, int]):
        loop = asyncio.get_event_loop()

        if isinstance(query, int):
            logger.info(f"Weather at zipcode: {query}")
            pfunc = partial(self.api.weather_at_zip_code, zipcode=str(query), country='us')

        elif isinstance(query, str):
            logger.info(f"Weather at place: {query}")
            pfunc = partial(self.api.weather_at_place, name=query)

        observation = await loop.run_in_executor(None, pfunc)

        if observation is not None:
            response = Response.load(observation)
            logger.info(response)
            return response

class WeatherCRUD:
    api = AsyncOWM(WEATHER['api_key'])

    @classmethod
    async def get_weather(cls, query: Union[str, int]):
        return await cls.api.weather_at(query)


@dataclass
class Response:
    icon: str
    location: str
    conditions: str
    temp_F: float
    temp_C: float
    humidity: float
    wind_mph: float
    wind_mps: float
    cloudiness: float

    @classmethod
    def load(cls, data: Observation) -> 'Response':
        weather = data.weather
        location = data.location
        description = weather.detailed_status

        if 'cloud' in description:
            icon = "☁"
        elif 'snow' in description:
            icon = "❄"
        elif any((word in description) for word in ('rain', 'storm', 'drizzle')):
            icon = "☔"
        else:
            icon = "☀"

        return cls(
            icon=icon,
            location=location.name,
            conditions=weather.detailed_status,
            temp_F=weather.temperature('fahrenheit')['temp'],
            temp_C=weather.temperature('celsius')['temp'],
            humidity=weather.humidity,
            wind_mph=weather.wind('meters_sec')['speed'],
            wind_mps=weather.wind('miles_hour')['speed'],
            cloudiness=weather.clouds,
        )

    @property
    def title(self) -> str:
        return f"{self.icon} __Weather for {self.location}__:"

    @property
    def description(self) -> str:
        return '\n'.join((
            f"**Conditions:** {self.conditions}",
            f"**Temp:** {self.temp_F:.1f} °F / {self.temp_C:.1f} °C",
            f"**Humidity:** {self.humidity}%",
            f"**Wind:** {self.wind_mph:.2f} mph / {self.wind_mps:.2f} m/s",
            f"**Cloudiness:** {self.cloudiness}%",
        ))
