# Discord-VR
**Discord-VR** is a package written in **JavaScript** willing to help in the development of **Discord Bots**!

## Example Usage
```js
const { Client } = require('discord.js');
const { DVRClient } = require('discord-vr');
const client = new Client();
const dvrclient = new DVRClient({
	client,
	userID: "1234567890",
	rewardAmount: 150,
	port: 3000
});

client.login('discord bot token');
```
Now, in order for this to work, you need to know your server's URl, most of the times it is http://ip:port, but if you're using [Repl.it](https://replit.com), or [Glitch](https://glitch.com), you only need the URL which will be displayed right after you declare Discord-VR's client. Then, go to any of the bot lists down below and set the URl to <your URL>/webhook/votes, after that check the table down below to see the authentication depending on the bot list.

| Bot List    | Auth |                           
| ----------- | -----|
| `infinitybotlist.com`     | 1234567890.ibl       | 
| `top.gg`      | 1234567890.top.gg |
| `discordbotlist.com`      | 1234567890.dbl.com   |
| `voidbots.net`     | 1234567890.vb               |      
| `botsfordiscord.com`   | 1234567890.bfd          |
| `bots.discordlabs.org` | 1234567890.dl           | 


This package requires `quick.db@^7.0.0-b22` in order to work properly, the package includes this by itself, please do not install any other version or else the package will error!

For further help visit the [Documentation](https://discord-vr.js.org) or join the [Support Server](https://discord.gg/XjZsnZVurC)
## Credits
- **Main Developer**: [3STEB4N28](https://github.com/3STEB4N28/3STEB4N28)
- **Co Developer**: [LostNuke](https://github.com/LostNuke/LostNuke)
- **Co Developer**: [Fyrlex](https://github.com/Fyrlex)
