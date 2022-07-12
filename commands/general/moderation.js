const { SlashCommandBuilder, bold } = require("@discordjs/builders");
const { PermissionFlagsBits } = require('discord-api-types/v10');
const wait = require('node:timers/promises').setTimeout;

// Moderation commands
module.exports = {
	data: new SlashCommandBuilder()
		.setName("moderation")
		.setDescription("Moderation commands (e.g. ban, kick, mute, unmute, etc.)")
        .addSubcommand(subcommand =>
            subcommand
                .setName("ban")
                .setDescription("Bans a user from the server.")
                .addUserOption(option => option.setName("target").setDescription("The user to be banned"))
                .addStringOption(option => option.setName("reason").setDescription("The reason for the ban")))
        .addSubcommand(subcommand =>
            subcommand
                .setName("kick")
                .setDescription("Kicks a user from the server.")
                .addUserOption(option => option.setName("target").setDescription("The user to be kicked"))
                .addStringOption(option => option.setName("reason").setDescription("The reason for the ban")))
        .addSubcommand(subcommand =>
            subcommand
                .setName("mute")
                .setDescription("Mutes a user in the server.")
                .addUserOption(option => option.setName("target").setDescription("The user to be muted"))
                .addIntegerOption(option => option.setName("duration").setDescription("The duration of the mute in minutes"))
                .addStringOption(option => option.setName("reason").setDescription("The reason for the mute")))
        .addSubcommand(subcommand =>
            subcommand
            .setName("clear")
            .setDescription("Clears a number of messages from the current channel.")
            .addIntegerOption(option => option.setName("count").setDescription("The number of messages to clear")))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
                
	async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const muteRole = interaction.guild.roles.cache.find(role => role.name === "Muted");

        if (subcommand === "ban") {
            const target = interaction.options.getUser("target");
            if (!target) {
                await interaction.reply({ content: "Please specify a user to ban.", ephemeral: true });
                return;
            }

            const reason = interaction.options.getString("reason");
            if (!reason) {
                await interaction.reply({ content: "Please specify a reason for the ban.", ephemeral: true });
                return;
            }

            interaction.guild.members.ban(target, { reason: reason });
            await interaction.reply({ content: `${bold(target.tag)} has been banned.\nReason: ${reason}` });
        }

        if (subcommand === "kick") {
            const target = interaction.options.getMember("target");

            if (!target) {
                await interaction.reply({ content: "Please specify a user to kick.", ephemeral: true });
                return;
            }

            const reason = interaction.options.getString("reason");
            if (!reason) {
                await interaction.reply({ content: "Please specify a reason for the kick.", ephemeral: true });
                return;
            }

            target.kick(reason);
            await interaction.reply({ content: `${bold(target.user.tag)} has been kicked.\nReason: ${reason}` });
        }

        if (subcommand === "mute") {
            const target = interaction.options.getMember("target");
            if (!target) {
                await interaction.reply({ content: "Please specify a user to mute.", ephemeral: true });
                return;
            }

            const duration = interaction.options.getInteger("duration");
            if (!duration) {
                await interaction.reply({ content: "Please specify a duration for the mute.", ephemeral: true });
                return;
            }

            const reason = interaction.options.getString("reason");
            if (!reason) {
                await interaction.reply({ content: "Please specify a reason for the mute.", ephemeral: true });
                return;
            }

            if (!muteRole) {
                await interaction.reply({ content: "Please create a role called \"Muted\".", ephemeral: true });
                return;
            }

            const roles = target.roles.cache;
            target.roles.remove(roles);

            const muteTime = duration * 60 * 1000;

            target.roles.add(muteRole);

            if (duration == 1) {
                await interaction.reply({ content: `${bold(target.user.tag)} has been muted for 1 minute.\nReason: ${reason}` });
            } else {
                await interaction.reply({ content: `${bold(target.user.tag)} has been muted for ${duration} minutes.\nReason: ${reason}` });
            }
            
            setTimeout(() => {
                target.roles.remove(muteRole);
                target.roles.add(roles);
                interaction.editReply({ content: `${bold(target.user.tag)} has been unmuted.` });
            }, muteTime);
        }

        if (subcommand === "clear") {
            const count = interaction.options.getInteger("count");
            if (!count) {
                await interaction.reply({ content: "Please specify a number of messages to clear.", ephemeral: true });
                return;
            }

            const messages = await interaction.channel.messages.fetch({ limit: count });
            await interaction.channel.bulkDelete(messages);

            await interaction.reply({ content: `Cleared ${count} messages.`, ephemeral: true });
            await wait(5000);
            await interaction.deleteReply();
        }
	}
};
