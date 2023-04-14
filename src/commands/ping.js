//@ts-check

import { CommandInteraction } from 'discord.js';

export const Command = {
    name: 'ping',
    description: 'Raven\'in gecikme değerlerine bakarsın.',
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: (interaction) => {
        interaction.reply(`Pong, *${interaction.client.ws.ping}ms*`)
    }
}