// require('dotenv').config();
const {channel, sites, interval}  = require('./config.json');
const {Client} = require('discord.js');
const fetch = require('node-fetch');
const { token } = process.env;
const client = new Client({
    intents: ["GUILDS",
    
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING"],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    restTimeOffset: 0,
    allowedMentions: {
        parse: ['users']
    }
})



client.on('ready', () => {
    const channel_exist = client.channels.cache.get(channel)
    if(!channel_exist){
        console.error('Channel not found please reconfigure config.json, process exiting...')
      return client.destroy() && process.exit(1)
    }
    const channelname = channel_exist.name
console.log("Started Monitoring " + sites.length + " sites" + " on channel: #" + channelname);
  
    client.user.setActivity(`Monitoring ${sites.length} sites`, { type: 'PLAYING' });

})


client.on('ready', () => {
    setInterval(async () => {
    sites.forEach(async site => {
        const status = await fetch(site.url, { method: 'HEAD' 
    })
   if(status.status !== 200){
    return client.channels.cache.get(channel).send(`:x: ${site.name} is down. Status code: ${status.status}`)
   } else {
 
    return client.channels.cache.get(channel).send(`:white_check_mark: ${site.name} is up and running status code: ${status.status}`)

   }
    })
}, interval) 


})




client.login(token);
