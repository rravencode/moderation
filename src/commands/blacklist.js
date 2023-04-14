//@ts-check

import { CommandInteraction, EmbedBuilder } from 'discord.js';

import db from 'croxydb';
import config from '../config.js'

export const Command = {
    name: 'karaliste',
    description: 'Sistemimden bir kullanıcıyı yasaklarsın.',
    options: [
        {
            type: 3,
            name: 'id',
            description: 'Kullanıcı ID\'si giriniz.',
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: (interaction) => {
        if(config.owners.includes(interaction.user.id)) {
            let id = interaction.options.get('id', true).value;
            let bl = db.fetch('blacklist');

            if(config.owners.includes(`${id}`)) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor('Red')
                        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                        .setDescription(`> Bot geliştiricilerini kara listeye **ekliyemezsin**.`)
                        .setFooter({ text: `${interaction.client.user.tag} - .gg/altyapilar`, iconURL: `${interaction.client.user.avatarURL()}` })
                        .setTimestamp()
                    ]
                });

            } else {
                if(!bl.includes(id)) {
                    db.push('blacklist', id);
    
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor('Green')
                            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                            .setDescription(`> **${id}** ID'li kullanıcı kara listeye eklendi.`)
                            .setFooter({ text: `${interaction.client.user.tag} - .gg/altyapilar`, iconURL: `${interaction.client.user.avatarURL()}` })
                            .setTimestamp()
                        ]
                    });
                } else {
                    db.unpush('blacklist', id);
    
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor('Green')
                            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                            .setDescription(`> **${id}** ID'li kullanıcı kara listeden çıkarıldı.`)
                            .setFooter({ text: `${interaction.client.user.tag} - .gg/altyapilar`, iconURL: `${interaction.client.user.avatarURL()}` })
                            .setTimestamp()
                        ]
                    });
                }
            }
        }
    }
}