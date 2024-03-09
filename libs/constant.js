const helpText = `
Selamat datang, Silahkan gunakan perintah yang tersedia berikut ini:
-----------------------------
!commands       show all commands button
!help           see commands
!halo           greetings bot
!quote          generate random quote
!news           generate recent news today
!quake          generate recent earthquake from BMKG
!follow [text]  follow text you wrote
-----------------------------
`;

const invalidCommand = `Command unavailable, please use !help to use command`;

module.exports = { helpText, invalidCommand };
