/*
 * File: c:\Users\tonyw\Desktop\ReggieBot\paapp2-discord-bot\src\commands\utility\help.js
 * Project: c:\Users\tonyw\Desktop\ReggieBot\paapp2-discord-bot
 * Created Date: Monday June 26th 2023
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat August 5th 2023 3:44:53 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2023 Tone Web Design, Molex
 */

const { EmbedBuilder } = require('discord.js');
const config = require('../../../config.json');
const fs = require('fs');
const path = require("path");

/**
 * Displays information about a specific command, or all commands if no command name is provided
 */
module.exports = {
  name: "help",
  description: "Information for specific command, ex: 'prefix help setup'",
  aliases: ["commands"],
  category: "Utility",
  usage: `<command>`,

  /**
   * @param {*} message - The message object that was sent to trigger this command
   * @param {*} args - The arguments passed with this command
   * @param {*} guildPrefix - The prefix for this guild
   * @param {*} client - The Discord client
   * @returns - A message with information about the requested command
   */
  execute(message, args, guildPrefix, client) {
    const { commands } = message.client;
    const guildId = message.guild.id;
    const guildConfigPath = path.join(__dirname, '../../../guilds', `${guildId}.json`);
    const guildConfig = JSON.parse(fs.readFileSync(guildConfigPath, 'utf8'));
    const prefix = guildConfig && guildConfig.prefix ? guildConfig.prefix : config.defaultPrefix;

    this.description = `Information for specific command, ex: '\`${prefix}help setup\`'`;

    if (!args.length) {
      const groupedCommands = {};
      commands.forEach((command) => {
        const category = command.category || "Other";
        if (!groupedCommands[category]) {
          groupedCommands[category] = [];
        }
        groupedCommands[category].push(command);
      });

      const embed = new EmbedBuilder()
      .setColor("#425678")
        .setTitle("Available Commands")
        .setDescription("Here's a list of all available commands:");

      for (const [category, commandList] of Object.entries(groupedCommands)) {
        const commandDescriptions = commandList.map(command => `\`${prefix}${command.name}${command.usage ? " " + command.usage : ""}\`: ${command.description}`).join("\n");
        embed.addFields(
          { name: category, value: commandDescriptions },
        );
      }

      message.channel.send({ embeds: [embed] });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

      if (!command) {
        return message.reply("That's not a valid command.");
      }

      const embed = new EmbedBuilder()
      .setColor("#425678")
        .setTitle(`Command: ${command.name}`)
        .setDescription(`**Description:** ${command.description}`)
        .addFields(
          { name: "Usage", value: `\`${prefix}${command.name}${command.usage ? " " + command.usage : "" }\`` },
        );

        if (command.aliases) {
          const prefixedAliases = command.aliases.map(alias => `\`${prefix}${alias}\``);
          embed.addFields(
            { name: "Aliases", value: prefixedAliases.join(", ") },
          );
        }
        

      if (command.isAdmin) {
        embed.addFields(
          { name: "Admin Only", value: "This command can only be used by administrators." },
        );
      }

      message.channel.send({ embeds: [embed] });
    }
  }
};
