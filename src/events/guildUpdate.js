/*
 * File: c:\Users\tonyw\AppData\Local\Temp\scp43687\home\bots\ReggieBot\src\events\guildUpdate.js
 * Project: c:\Users\tonyw\Desktop\ReggieBot\paapp2-discord-bot
 * Created Date: Saturday August 5th 2023
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat August 5th 2023 10:17:20 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2023 Tone Web Design, Molex
 */
const axios = require('axios');

/**
 * The `guildUpdate` event is emitted whenever a guild is updated - e.g. server name, guild avatar change.
 * @param {Guild} oldGuild The guild before the update
 */
module.exports = {
  name: 'guildUpdate',

  /**
   * The `guildUpdate` event is emitted whenever a guild is updated - e.g. server name, guild avatar change.
   * @param {*} oldGuild - The guild before the update
   * @param {*} newGuild - The guild after the update
   */
  execute(oldGuild, newGuild) {
    if (oldGuild.name !== newGuild.name) {
      console.log(`Guild name changed from ${oldGuild.name} to ${newGuild.name}`);
    }

    if (oldGuild.icon !== newGuild.icon) {
      console.log(`Guild icon changed from ${oldGuild.icon} to ${newGuild.icon}`);
    }

    const guildId = newGuild.id;
    const updateData = {
      guildId: guildId,
      guildName: newGuild.name,
      guildAvatar: newGuild.iconURL()
    };

    axios.put(`https://api.tonewebdesign.com/pa/regiments/updateDiscord`, updateData)
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
