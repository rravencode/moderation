//@ts-check

import { EmbedBuilder } from 'discord.js';

import db from 'croxydb';

export const Event = {
    name: 'interactionCreate',
    /**
     * 
     * @param {import('discord.js').Interaction} interaction 
     */
    run: (interaction) => {
        if(interaction.isCommand()) {
            let command = interaction.client.commands.get(interaction.commandName);
            let bl = db.fetch('blacklist');

            if(command) {
                if(bl.includes(interaction.user.id)) {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor('Red')
                            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                            .setDescription(`Beni kötüye kullandığın için kara listeye eklendin.`)
                            .setFooter({ text: `${interaction.client.user.tag} - .gg/altyapilar`, iconURL: `${interaction.client.user.avatarURL()}` })
                            .setTimestamp()
                        ]
                    }); 
                } else {
                    command.run(interaction)
                }
            }
        }
    }
}