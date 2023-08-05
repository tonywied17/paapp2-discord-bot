/*
 * File: c:\Users\tonyw\Desktop\ReggieBot\paapp2-discord-bot\src\events\guildMemberRemove.js
 * Project: c:\Users\tonyw\Desktop\ReggieBot\paapp2-discord-bot
 * Created Date: Friday August 4th 2023
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat August 5th 2023 3:46:53 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2023 Tone Web Design, Molex
 */
const axios = require('axios');

/**
 * Updates the member count for the guild
 */
module.exports = {
  name: 'guildMemberRemove',

  /**
   * @param {*} member - The member that left the guild
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