const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./otions')
const token = '6097724186:AAHrKBvi9t3p44u9Zdn1o0zDkJ3Ud1FZEy8'

const bot = new TelegramApi(token,{polling: true})

const chats =  {};



const startGame = async (chatId) => {  
    await bot.sendMessage(chatId, '\
        Сейчас я загадаю цифру от 0 до 9, а ты должен её угадать :)\n'+
        '\n'+
        'I will think about the number from 0 to 9 and you have to guess it :)')
        const randomNumber = Math.floor(Math.random() * 10);
        chats[chatId] = randomNumber;
        console.log(chats[chatId]);
        await bot.sendMessage(chatId, 'Отгадывай! \n'+
            '\n'+
            'Time to guess!', gameOptions);

}

const start = () => {
    const startCommands = '\
    Добро пожаловать в лягушачий чат!\n'+
    'Welcome to the frog chat! \n'+
    '\n'+
    'Вот что я умею // Here\'s what i can do:\n' +
    '\n'+
    '/\gym - Запиши меня на лягушачью тренировку!\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t Sign me up for frog training \n'+
    '\n'+
    '/\game - Хочу сыграть в лягушачью игру!\n'+
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t I want to play the frog game!'

bot.setMyCommands([
    {command: '/gym', description: 'Запиши меня на лягушачью тренировку! // Sign me up for a frog training'},
    {command: '/game', description: 'Лягушачья игра // Frog game'},
]);

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if( text === '/start'){
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/9ad/9b9/9ad9b9be-2bed-40d8-9e83-ac73840777ff/2.webp')
        return bot.sendMessage(chatId, startCommands);
    } 

    if(text === '/gym'){
        return bot.sendMessage(chatId, `${msg.from.first_name}`+
        ' , запись на тренировку "Лягушка 3D" прошла успешно.\n'+
        '\n'+
        'Жду тебя в среду в 18:00!\n'+
        '\n'+
        '\n'+
        'Appointment is successful.\n'+
        '\n'+
        'Waiting for you on Wednesday, 6pm!')
    }  
    if(text === '/game'){
         return startGame(chatId);
    }
    return bot.sendMessage(chatId, 'Спасибо, приму к сведению');

})
};

bot.on('callback_query', async msg =>{
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === '/again'){
        return startGame(chatId);
    }
    if(data == Number(chats[chatId])){
        return await bot.sendMessage(chatId, `Ты угадал! Это была цифра ${data}.\n` +'\n' + '+1 к лягушачьей карме!', againOptions);
    } else {
        return bot.sendMessage(chatId, `Не угадал. Верная цифра: ${chats[chatId]}\n ` + '\n' +  '-1 к лягушачьей карме...', againOptions)
    }

});


start();