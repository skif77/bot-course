const {gameOptions, againOptions} = require ('./options.js')

const TelegramApi = require('node-telegram-bot-api')

 const token = '6510579156:AAEGLS5mfNXGOxCi08gin146CVKIRej6SW8'

const bot = new TelegramApi(token, {polling: true})

 const chats ={}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 1 до 9, а ты должен ее угадать!`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    return bot.sendMessage(chatId, 'Угадывай ! ', gameOptions);
}

bot.setMyCommands([
    {command: '/start', description: 'начальное приветствие'},
    {command: '/info', description: 'Получить информацию о пользователе'},
    {command: '/game', description: 'Игра угадай цифру'},
])

bot.on('message', async msg => {
   const text = msg.text;
   const chatId = msg.chat.id;



   if  (text === '/start') {
       await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ef5/8e1/ef58e15f-94a2-3d56-a365-ca06e1339d08/2.webp')
       return  bot.sendMessage(chatId, `Добро пожаловать в телеграмм бот автора `);
   }
   if (text === '/info') {
       return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} `);
   }
   if (text === '/game') {
      return startGame(chatId)
   }

   return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз!)`);

})

  bot.on('callback_query', async msg => {
      const data = msg.data;
      const chatId = msg.message.chat.id;
      if (data === '/again') {
          return startGame(chatId)
      }

      if (data === chats[chatId]) {
          return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions)
      } else {
          return bot.sendMessage(chatId, `К сожалнению, ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
      }


  } )
