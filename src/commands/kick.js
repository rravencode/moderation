//@ts-check

import { CommandInteraction, EmbedBuilder, codeBlock } from 'discord.js';

export const Command = {
    name: 'kick',
    description: 'Etiketlenen kullanıcıyı sunucudan atar.',
    options: [
        {
            type: 6,
            name: 'kullanıcı',
            description: 'Bir kullanıcı etiketleyin.',
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: async (interaction) => {
        let member = await interaction.guild?.members.fetch(`${interaction.options.get('kullanıcı', true).user?.id}`);

        if(interaction.memberPermissions?.has('KickMembers')) {

            member?.ban({ reason: 'kick' }).then(() => {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor('Green')
                        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                        .setDescription(`> **${member?.nickname ? `${member.nickname} (${member.displayName})` : `${member?.displayName}`}** sunucudan başarıyla atıldı.`)
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