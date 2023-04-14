//@ts-check

import * as fs from 'fs';

import { Client, Collection } from 'discord.js';

/**
 * 
 * @param {Collection} collection 
 */
export const loadCommands = (collection) => {
    fs.readdirSync('src/commands').filter((file) => file.endsWith('.js')).forEach(async (file) => {
        const { Command } = await import(`../commands/${file}`);
     
        collection.set(Command.name, Command)
     });
}
/**
 * 
 * @param {Client} client 
 */
export const loadEvents = (client) => {
    fs.readdirSync('src/events').filter((file) => file.endsWith('.js')).forEach(async (file) => {
        const { Event } = await import(`../events/${file}`);
     
        client.on(Event.name, (...args) => {
            Event.run(...args)
        })
     });
}