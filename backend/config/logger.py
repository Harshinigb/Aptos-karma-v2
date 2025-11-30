# backend/config/logger.py
import logging
import sys
import json
from config.settings import settings

class JsonFormatter(logging.Formatter):
    def format(self, record):
        log_record = {
            "level": record.levelname,
            "time": self.formatTime(record, self.datefmt),
            "message": record.getMessage(),
            "logger": record.name,
        }
        return json.dumps(log_record)

def setup_logger():
    logger = logging.getLogger()

    # clear existing handlers
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)

    level = getattr(logging, settings.LOG_LEVEL.upper(), logging.DEBUG)
    logger.setLevel(level)

    handler = logging.StreamHandler(sys.stdout)

    if settings.ENV == "production":
        handler.setFormatter(JsonFormatter())
    else:
        handler.setFormatter(logging.Formatter(
            "[%(levelname)s] %(asctime)s - %(message)s",
            "%Y-%m-%d %H:%M:%S"
        ))

    logger.addHandler(handler)
    return logger

logger = setup_logger()
