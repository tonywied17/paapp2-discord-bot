/*
 * File: c:\Users\tonyw\Desktop\ReggieBot\paapp2-discord-bot\src\handlers\commandHandler.js
 * Project: c:\Users\tonyw\Desktop\ReggieBot\paapp2-discord-bot
 * Created Date: Monday June 26th 2023
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat August 5th 2023 3:48:37 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2023 Tone Web Design, Molex
 */
const fs = require("fs");
const { Collection } = require("discord.js");
const path = require("path");

/**
 * Loads all commands from the specified directory
 */
module.exports = {

  /**
   * @param {*} client - The Discord client
   * @param {*} dir - The directory to load commands from
   */
  loadCommands(client, dir) {
    const commandFiles = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of commandFiles) {
      if (file.isDirectory()) {
        const subDir = path.join(dir, file.name);
        module.exports.loadCommands(client, subDir);
        continue;
      }

      if (!file.name.endsWith(".js")) continue;

      const command = require(path.resolve(dir, file.name));
      console.log("Loaded command:", command.name);
      client.commands.set(command.name, command);
    }
  },
};
