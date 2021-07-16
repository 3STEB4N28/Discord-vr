const p = require("../index.js");
const { EventEmitter } = require("events");
const express = require("express");
const app = express();
const colors = require("colors");
const bp = require('body-parser');
app.use(bp.json());

class Client extends EventEmitter {
	constructor (options) {
		super();
		
		const { client } = options;
        let { userID, port } = options;
        
        try {
        	this.discord = require('discord.js');
        } catch (e) {
        	new Error('\x1b[32m[DiscordVR]\x1b[0m DiscordVR requires Discord.js to work correctly!');
        }
		
		function emit(name, args) {
			this.emit(name, args);
		};
		
		if(!client) {
			return new Error(`\x1b[32m[DiscordVR]\x1b[0m A`, "client".underline.red, 'wasn\'t provided!');
		}
		
		this.client = client;
		
		if(!userID) {
			return new Error(`\x1b[32m[DiscordVR]\x1b[0m A`, "userID".underline.red, `wasn't provided!`);
		}
		
		if (!(client instanceof this.discord.Client)) return new Error('\x1b[32m[DiscordVR]\x1b[0m "client" is not a discord.js client!');
		
		if(!port) {
			new Error(`\x1b[32m[DiscordVR]\x1b[0m A `, "port".underline.red, ` wasn't provided, defaulting to 3000!`);
			options.port = 3000;
		}
		
		app.post("/webhook/votes", async (req, res) => {
			res.sendStatus(200);	
			let body = req.body;
			let auth = req.headers.authorization;
			let bot = this.client.user.id;
			let user;
			let a;
			let info;
		
			if(auth === `${bot.userID}.ibl`) {
				a = await this.client.users.fetch(body.userID);
				user = a.id;
				info = {			
					username: a.username,			
					tag: a.tag,			
					userID: user,	
					botlist: 'infinitybotlist.com'
				}	
			} else if(auth === `${bot.userID}.top.gg`) {
			a = await this.client.users.fetch(body.user);
			user = a.id;
			info = {
				username: a.username,
				tag: a.tag,
				userID: user,
				botlist: 'top.gg'
			}
		} else if(auth === `${bot.userID}.dbl.com`) {
			a = await this.client.users.fetch(body.id);
			user = a.id;
			info = {
				username: a.username,
				tag: a.tag,
				userID: user,
				botlist: 'discordbotlist.com'
			}
		} else if(auth === `${bot.userID}.bfd`) {
			a = await this.client.users.fetch(body.user);
			user = a.id;
			info = {
				username: a.username,
				tag: a.tag,
				userID: user,
				botlist: 'botsfordiscord.com'
			}
		} else if(auth === `${bot.userID}.vb`) {
			a = await this.client.users.fetch(body.user);
			user = a.id;
			info = {
				username: a.username,
				tag: a.tag,
				userID: user,
				botlist: 'voidbots.net'
			}
		} else if(auth === `${bot.userID}.dl`) {
			a = await this.client.users.fetch(body.uid);
			user = a.id;
			info = {
				username: a.username,
				tag: a.tag,
				userID: user,
				botlist: 'bots.discordlabs.org'
			}
		} else {
			console.log(`\x1b[32m[DiscordVR]\x1b[0m An unknown request has been made to the votes webhook with authorization:`, auth, 'and body:', req.body);
		}
		});
		
		this.emit('upvote', info);
		app.listen(port, async () => {
			console.log("\x1b[32m[DiscordVR]\x1b[0m DiscordVR Webhook is running.");
			this.emit("ready");
			
		});
	}
	async getData(userID, type) {
		let data;
		
		if(!type) { 
			console.log(`\x1b[32m[DiscordVR]\x1b[0m Function`, 'getData'.blue, ` is missing a`, 'type'.underline.red, '!');
			return;
		}
		
		if(!userID) {
			console.log(`\x1b[32m[DiscordVR]\x1b[0m Function`, 'getData'.blue, ` is missing a`, 'userID'.underline.red, '!');
			return;
		}
		
		if(type === 'Money') {
			let dat = await db.fetch(`${userID}.Money`);
			if(!dat) dat = 0;
			
			data = dat;
		} else if(type === 'votePoints') {
			let dat = await db.fetch(`${userID}.votePoints`);
			if(!dat) dat = 0;
			
			data = dat;
		} else if(type === 'fullData') {
			let dat = await db.fetch(userID);
			if(!dat) dat = 'This user does not have any data!';
			
			data = dat;
		}
		return data;
	}
}

module.exports = Client;
