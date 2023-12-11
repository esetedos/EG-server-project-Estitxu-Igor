const userService = require('../../src/services/userServices')

const server = require('../../index.js')
const io = require('../sockets/socketMain')


const myCronJob = async () => {
    const penaltyStamina = -10;
    const penaltyAg = -5;
    const penaltyStr = -2;
    const userList = await userService.getAllUsers();
    const newUserList = [];

    for(const user of userList){
      if(user.rol == "Acolito"){ 

        const newStats = {
            stamina: user.characterStats.stamina + penaltyStamina < 1?0:user.characterStats.stamina + penaltyStamina,
            agility: user.characterStats.agility + penaltyAg <1?0:user.characterStats.agility + penaltyAg,
            strength: user.characterStats.strength + penaltyStr <1?0:user.characterStats.strength + penaltyStr,
            intelligence: user.characterStats.intelligence

        }

        const newUser = await userService.updatedUser(user.email, "characterStats", newStats)

        console.log()

        newUserList.push(newUser[0]);

      }
      else{
        newUserList.push(user);
      }
    }
    console.log('*************** CRON TRIGGERED ***********')
    io.emit("userList", newUserList);
  };

  module.exports = myCronJob