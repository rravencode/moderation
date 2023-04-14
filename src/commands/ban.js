//@ts-check

import { CommandInteraction, EmbedBuilder, codeBlock } from 'discord.js';

export const Command = {
    name: 'ban',
    description: 'Etiketlenen kullanıcıyı sunucudan banlar.',
    options: [
        {
            type: 6,
            name: 'kullanıcı',
            description: 'Bir kullanıcı etiketleyin.',
            required: true
        },
        {
            type: 3,
            name: 'sebep',
            description: 'Kullanıcı hangi sebep ile banlanıyor?'
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: async (interaction) => {
        let member = await interaction.guild?.members.fetch(`${interaction.options.get('kullanıcı', true).user?.id}`);
        let reason = interaction.options.get('sebep', true).value;

        if(interaction.memberPermissions?.has('BanMembers')) {

            member?.ban({ reason: `${reason || ' '}` }).then(() => {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor('Green')
                        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                        .setDescription(`> **${member?.nickname ? `${member.nickname} (${member.displayName})` : `${member?.displayName}`}** sunucudan başarıyla banlandı.`)
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