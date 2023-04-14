//@ts-check

import { ChannelType, CommandInteraction, EmbedBuilder, codeBlock } from 'discord.js';

export const Command = {
    name: 'sil',
    description: 'Belirlenen mesajlar sunucudan silinir.',
    options: [
        {
            type: 4,
            name: 'sayı',
            description: 'Silinecek mesaj sayısını giriniz.',
            min_value: 5,
            max_value: 100,
            required: true,
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: async (interaction) => {
        let messageSize = Number(interaction.options.get('sayı', true).value);

        if(interaction.memberPermissions?.has('ManageMessages')) {
            if(interaction.channel?.type === ChannelType.GuildText) {
                interaction.channel.bulkDelete(messageSize, true).then(() => {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor('Green')
                            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                            .setDescription(`> **${messageSize}** mesaj başarıyla çöp kutusuna atıldı.`)
                            .setFooter({ text: `${interaction.client.user.tag} - .gg/altyapilar`, iconURL: `${interaction.client.user.avatarURL()}` })
                            .setTimestamp()
                        ]
                    });
                }).catch((err) => {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor('Red')
                            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                            .setDescription(`${codeBlock('diff', `- ${err.message}`)}`)
                            .setFooter({ text: `${interaction.client.user.tag} - .gg/altyapilar`, iconURL: `${interaction.client.user.avatarURL()}` })
                            .setTimestamp()
                        ]
                    });
                });
            }
        }
    }
}