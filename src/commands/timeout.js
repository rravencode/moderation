//@ts-check

import { CommandInteraction, EmbedBuilder, codeBlock } from 'discord.js';

export const Command = {
    name: 'mute',
    description: 'Etiketlenen kullanıcı sunucudan belirlenen süre ile susuturulur.',
    options: [
        {
            type: 6,
            name: 'kullanıcı',
            description: 'Bir kullanıcıyı etiketleyin.',
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: async (interaction) => {
        let member = await interaction.guild?.members.fetch(`${interaction.options.get('kullanıcı', true).user?.id}`);

        member?.timeout(900_000).then(() => {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor('Green')
                    .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                    .setDescription(`> <@${member?.id}> adlı kullanıcı sunucudan bir süreliğine susturuldu.`)
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