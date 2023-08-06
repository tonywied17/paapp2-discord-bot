/*
 * File: c:\Users\tonyw\Desktop\ReggieBot\paapp2-discord-bot\src\events\guildMemberRemove.js
 * Project: c:\Users\tonyw\Desktop\ReggieBot\paapp2-discord-bot
 * Created Date: Friday August 4th 2023
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat August 5th 2023 10:16:45 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2023 Tone Web Design, Molex
 */
const axios = require('axios');

/**
 * The `guildMemberRemove` event is emitted whenever a member leaves a guild, or is kicked.
 * @param {GuildMember} member The member that left the guild
 * @returns {void}
 */
module.exports = {
  name: 'guildMemberRemove',

  /**
   * The `guildMemberRemove` event is emitted whenever a member leaves a guild, or is kicked.
   * @param {*} member - The member that left the guild
   * @returns {void}
   */
  execute(member) {
    const guild = member.guild;
    const guildId = guild.id;
    const memberCount = guild.memberCount;

    console.log(`A member has left the guild: ${member.user.tag}`);
    
    axios.post(`https://api.tonewebdesign.com/pa/regiments/${guildId}/membercount`, {
      memberCount: memberCount,
    })
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    }
    )
    .catch((error) => {
      console.error(error)
    })
    
  },
};