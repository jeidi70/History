import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import MenuButtonWebApp, WebAppInfo
from aiogram.enums import ParseMode

# Настройка логов
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Инициализация бота
bot = Bot(token="7329811205:AAGAg5Un_4enwIsEPXPrTTXwojJ29XZgnA4", parse_mode=ParseMode.HTML)
dp = Dispatcher()

# Установка кнопки веб-приложения
async def set_menu():
    await bot.set_chat_menu_button(
        menu_button=MenuButtonWebApp(
            text="📖 Открыть учебник",
            web_app=WebAppInfo(url="https://ваш-сайт.vercel.app")  # Замените после деплоя
        )
    )

# Команда /start
@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    await set_menu()
    await message.answer("Добро пожаловать в учебник истории!")

if __name__ == '__main__':
    logging.info("Бот запущен!")
    dp.run_polling(bot)