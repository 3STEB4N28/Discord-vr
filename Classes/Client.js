const db = require("quick.db");
const p = require("../../src/index.js");
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
        let { userID, rewardAmount, port } = options;
        
        try {
        	this.discord = require('discord.js');
        } catch (e) {
        	console.log('\x1b[32m[DiscordVR]\x1b[0m DiscordVR requires Discord.js to work correctly!');
        }
		
		function emit(name, args) {
			this.emit(name, args);
		};
		
		if(!client) {
			console.log(`\x1b[32m[DiscordVR]\x1b[0m A`, "client".underline.red, 'wasn\'t provided!');
		}
		
		this.client = client;
		
		if(!userID) {
			console.clear();
			console.log(`\x1b[32m[DiscordVR]\x1b[0m A`, "userID".underline.red, `wasn't provided!`);
			return;
		}
		
		if(!rewardAmount) {
			console.clear();
			console.log(`\x1b[32m[DiscordVR]\x1b[0m A`, "rewardAmount".underline.red, `wasn't provided!`);
			return;
			
		} else {
			db.set(`client.settings.rewardAmount`, options.rewardAmount);
			db.set(`client.settings.userID`, options.userID);
		}
		if (!(client instanceof this.discord.Client)) return console.log('\x1b[32m[DiscordVR]\x1b[0m "client" is not a discord.js client!');
		
		if(!port) {
			console.clear();
			console.log(`\x1b[32m[DiscordVR]\x1b[0m A `, "port".underline.red, ` wasn't provided, defaulting to 3000!`);
			options.port = 3000;
			return;
		}
		
		app.post("/webhook/votes", async (req, res) => {
		res.sendStatus(200);
		let body = req.body;
		let auth = req.headers.authorization;
		let reward = await db.fetch('client.settings.rewardAmount');
		let bot = await db.fetch('client.settings');
		let user;
		let a;
		let data;
		let info;
		let newd = {
			Money: 0,
			votePoints: 0,
		}
		
		if(auth === `${bot.userID}.ibl`) {
			a = await this.client.users.fetch(body.userID);
			user = a.id;
			data = await db.fetch(user);
			if(!data) {
				db.set(user, newd)
			}
			db.add(`${a.id}.Money`, reward);
			db.add(`${a.id}.votePoints`, 1);
			info = {
				username: a.username,
				tag: a.tag,
				userID: user,
				totalVotes: await db.fetch(`${a.id}.votePoints`),
				botlist: 'infinitybotlist.com'
			}
			
			this.emit('upvote', info);
			console.log(`\x1b[32m[DiscordVR]\x1b[0m Infinity Bot List vote received! User:`, user, '(', a.tag, ')');
		} else if(auth === `${bot.userID}.top.gg`) {
			a = await this.client.users.fetch(body.user);
			user = a.id;
			data = await db.fetch(user);
			if(!data) {
				db.set(user, newd);
			}
			db.add(`${a.id}.Money`, reward);
			db.add(`${a.id}.votePoints`, 1);
			info = {
				username: a.username,
				tag: a.tag,
				userID: user,
				totalVotes: await db.fetch(`${a.id}.votePoints`),
				botlist: 'top.gg'
			}
			this.emit('upvote', info);
			console.log(`\x1b[32m[DiscordVR]\x1b[0m Top.gg vote received! User:`, user, '(', a.tag, ')');
			
		} else if(auth === `${bot.userID}.dbl.com`) {
			a = await this.client.users.fetch(body.id);
			user = a.id;
			data = await db.fetch(user);
			if(!data) {
				db.set(user, newd);
			}
			db.add(`${a.id}.Money`, reward);
			db.add(`${a.id}.votePoints`, 1);
			info = {
				username: a.username,
				tag: a.tag,
				userID: user,
				totalVotes: await db.fetch(`${a.id}.votePoints`),
				botlist: 'discordbotlist.com'
			}
			this.emit('upvote', info);
			console.log(`\x1b[32m[DiscordVR]\x1b[0m Discord Bot List vote received! User:`, user, '(', a.tag, ')');
		} else if(auth === `${bot.userID}.bfd`) {
			a = await this.client.users.fetch(body.user);
			user = a.id;
			data = await db.fetch(user);
			if(!data) {
				db.set(user, newd);
			}
			
			db.add(`${a.id}.Money`, reward);
			db.add(`${a.id}.votePoints`, 1);
			info = {
				username: a.username,
				tag: a.tag,
				userID: user,
				totalVotes: await db.fetch(`${a.id}.votePoints`),
				botlist: 'botsfordiscord.com'
			}
			this.emit('upvote', info);
			console.log(`\x1b[32m[DiscordVR]\x1b[0m Bots For Discord vote received! User:`, user, '(', a.tag, ')');
		} else if(auth === `${bot.userID}.vb`) {
			a = await this.client.users.fetch(body.user);
			user = a.id;
			data = await db.fetch(user);
				
			if(!data) {
				db.set(user, newd);
			}
				
			db.add(`${a.id}.Money`, reward);
			db.add(`${a.id}.votePoints`, 1);
				
			info = {
				username: a.username,
				tag: a.tag,
				userID: user,
				totalVotes: await db.fetch(`${a.id}.votePoints`),
				botlist: 'voidbots.net'
			}
				
			this.emit('upvote', info);
				
			console.log(`\x1b[32m[DiscordVR]\x1b[0m Void Bots vote received! User:`, user, '(', a.tag, ')');
		} else if(auth === `${bot.userID}.dl`) {
			a = await this.client.users.fetch(body.uid);
			user = a.id;
			data = await db.fetch(user);
				
			if(!data) {
				db.set(user, newd);
			}
				
			db.add(`${a.id}.Money`, reward);
				
			db.add(`${a.id}.votePoints`, 1);
			info = {
				username: a.username,
				tag: a.tag,
				userID: user,
				totalVotes: await db.fetch(`${a.id}.votePoints`),
				botlist: 'bots.discordlabs.org'
			}
				
			this.emit('upvote', info);
				
			console.log(`\x1b[32m[DiscordVR]\x1b[0m Discord Bot Labs (bots.discordlabs.org) vote received! User:`, user, '(', a.tag, ')');
		} else {
			console.log(`\x1b[32m[DiscordVR]\x1b[0m An unknown request has been made to the votes webhook with authorization:`, auth, 'and body:', req.body);
		}
		});
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
