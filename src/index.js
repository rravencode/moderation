//@ts-check

import { Client, Collection } from 'discord.js';
import { loadCommands, loadEvents } from './botBuilder/index.js';

import config from './config.js'

const client = new Client({
    intents: ['Guilds'],
    allowedMentions: {
        parse: ['everyone', 'roles', 'users']
    }
});

client.commands = new Collection();

loadCommands(client.commands);
loadEvents(client);

client.login(config.discord.token).then(() => {
    console.log('Discord API\'ye istek gönderimi başarılı.')
}).catch(console.log);