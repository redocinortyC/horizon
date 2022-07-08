const { SlashCommandBuilder, bold } = require("@discordjs/builders");
const { PermissionFlagsBits } = require('discord-api-types/v10');

// React command 
module.exports = {
	data: new SlashCommandBuilder()
		.setName("roles")
		.setDescription("Roles commands (e.g. add, remove, etc.)")
        .addSubcommand(subcommand =>
            subcommand
                .setName("add")
                .setDescription("Adds a role to a user.")
                .addUserOption(option => option.setName("target").setDescription("The user to give a role to"))
                .addRoleOption(option => option.setName("role").setDescription("The role to give the user")))
        .addSubcommand(subcommand =>
            subcommand
                .setName("remove")
                .setDescription("Removes a role from a user.")
                .addUserOption(option => option.setName("target").setDescription("The user to remove a role from"))
                .addRoleOption(option => option.setName("role").setDescription("The role to remove from the user")))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
		
	async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === "add") {
            const target = interaction.options.getMember("target");
            const role = interaction.options.getRole("role");
            
            if (!target) {
                await interaction.reply({ content: "Please specify a user to give a role to.", ephemeral: true });
                return;
            }

            if (!role) {
                await interaction.reply({ content: "Please specify a role to give the user.", ephemeral: true });
                return;
            }

            try {
                await target.roles.add(role);
                const comfirmationMsg = await interaction.reply({ content: `${bold(target.user.tag)} has been given the role ${bold(role.name)}.`, fetchReply: true });
                comfirmationMsg.react("✅");
            } catch (err) {
                const errorMsg = await interaction.reply({ content: `An error occurred while giving ${bold(target.user.tag)} the role ${bold(role.name)}.`, fetchReply: true });
                errorMsg.react("❌");
                console.error(err);
            }
        }

        if (subcommand === "remove") {
            const target = interaction.options.getMember("target");
            const role = interaction.options.getRole("role");
            
            if (!target) {
                await interaction.reply({ content: "Please specify a user to remove a role from.", ephemeral: true });
                return;
            }

            if (!role) {
                await interaction.reply({ content: "Please specify a role to remove from the user.", ephemeral: true });
                return;
            }

            try {
                await target.roles.remove(role);
                const comfirmationMsg = await interaction.reply({ content: `${bold(role.name)} has been removed from ${bold(target.user.tag)}.`, fetchReply: true });
                comfirmationMsg.react("✅");
            } catch (err) {
                const errorMsg = await interaction.reply({ content: `An error occurred while removing ${bold(role.name)} from ${bold(target.user.tag)}.`, fetchReply: true });
                errorMsg.react("❌");
                console.error(err);
            }
        }
	}
};
