//@ts-check
import { REST, Routes } from 'discord.js';

import db from 'croxydb';
import config from '../config.js';

export const Event = {
    name: 'ready',
    /**
     * 
     * @param {import('discord.js').Client} client 
     */
    run: (client) => {
        let rest = new REST({ version: '10' }).setToken(config.discord.token);

        rest.put(Routes.applicationCommands(config.discord.id), {
            body: client.commands.toJSON()
        });

        if(!db.has('blacklist')) {
            db.set('blacklist', [])
        }
    }
}