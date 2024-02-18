const helpText = (bot) => `
Selamat datang di ${bot.first_name}. Silahkan gunakan perintah yang tersedia berikut ini:
-----------------------------
!help   see commands
!halo   greetings bot
!quote  generate random quote
!news   generate recent news today
!quake  generate recent earthquake from BMKG
!follow [text] follow text you wrote
-----------------------------
`;

const invalidCommand = `Command unavailable, please use !help to use command`;

module.exports = helpText;
