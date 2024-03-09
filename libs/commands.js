const commandSymbol = "/";

const commands = {
  help: new RegExp(`^${commandSymbol}help$`),
  halo: new RegExp(`^${commandSymbol}halo$`),
  quotes: new RegExp(`^${commandSymbol}quotes$`),
  news: new RegExp(`^${commandSymbol}news$`),
  quakes: new RegExp(`^${commandSymbol}quakes$`),
  follow: new RegExp(`^${commandSymbol}follow(.+)`),
};
// const commands = {
//   help: /^!help$/,
//   halo: new RegExp(`^${commandSymbol}halo$`),
//   quote: /^!quote$/,
//   news: /^!news$/,
//   quake: /^!quake$/,
//   follow: /^!follow(.+)/,
// };

module.exports = commands;
