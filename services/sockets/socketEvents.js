const userService = require('../../src/services/userServices')
const artifactService = require('../../src/services/artifactService')
const searchService = require('../../src/services/searchService')
// const affectionService = require('../../src/services/')
const objectService = require('../../src/services/objectServices.js')


const server = require('../../index.js')
const io = server.socketIO;


events = (socket) => {

    console.log({ Clientsocket: socket.id });
    socket.emit("new_user", socket.id);

    // TEST BROADCAST
    socket.on('test_broadcast', async (data) => {
      try {
        io.emit('test_broadcast', data);
        console.log('************ TEST BROADCAST ***********')
        console.log(data)
      } catch (error) {
        console.log(error);
        io.emit('test_broadcastError', error);
      }
    });



    socket.on('disconnect', function (reason) {
      console.log('Socket disconnected because of ' + reason); 
  });

    //emit
    io.emit("hello", "world");

    //listen
    socket.on("hello", (arg) => {
      console.log(arg); // world
    });


    //LogState
    let token={token: ""};
   
    socket.on("logstate", async (arg) => {
      try {
        console.log(arg); // id and true/false
        token.token  =arg;
        console.log(token)
        const decodedUser = await userService.verifyUser(token);
        decodedUser.push({logstate: true})
        console.log(decodedUser)
        io.to(socket.id).emit("logstate", decodedUser);

      } catch (error) {
        console.log(error);
        console.log("there is no email or losState")
        io.emit('logstateError', error);
      }
    });

  
    socket.on("search", async (searchState) => {
      try{
        console.log('****** SEARCH EVENT **********')
        await searchService.updateStatus(searchState) //update to search new state
        io.emit("search", searchState)
      }
      catch(error){
        io.emit("error", error)
      }
    })

    socket.on("artifacts", async (allData) =>{
      try{
        let data = allData;
        let foundData = data.pop();
        let artifactsArray = data;
        const responseArray = [];

        console.log('************ ALL DATA ****************')
        console.log(allData)

        for(const artifact of artifactsArray){
          if(foundData.isFound === true && artifact.name === foundData.artifactName && foundData.foundByEmail !== "reboot"){
            const updatedArtifact = await artifactService.updateArtifact(foundData.artifactName, true, foundData.foundByEmail);
            responseArray.push(updatedArtifact);
          }
          else if(foundData.foundByEmail === "reboot"){
            const updatedArtifact = await artifactService.updateArtifact(artifact.name, false, foundData.foundByEmail)
            responseArray.push(updatedArtifact);
          }
          else{
            responseArray.push(artifact);
          }
        };
        console.log('************ FINISHES FOR OF ARTIFACTS ******************')
        io.emit("artifacts", responseArray)
        console.log('************ SOCKET ARRAY EMIT DONE ******************')
      }
      catch (error){
        io.emit("error", error)
        console.log('************ ALL DATA ****************')
        console.log(allData)
      }

    })

    socket.on("coords", async(data) =>{
      try{
        io.emit("coordUser", data)
      }
      catch(error){
        io.emit("error", error)
      }

    })

    socket.on("restoreStamina", async(userEmail) =>{
      console.log(userEmail)
      try{
        const restoreStamina = 40;
        const restoreAg = 20;
        const restoreStr = 8;
        const userList = await userService.getAllUsers();
        const newUserList = [];

        for(const user of userList){
          if(user.email === userEmail){ 
            let newStamina = user.characterStats.stamina + restoreStamina;
            let newAgility = user.characterStats.agility + restoreAg;
            let newStrength = user.characterStats.strength + restoreStr;

            if(newStamina > 100)
              newStamina = 100;

            if(newAgility > 100)
              newAgility = 100;

            if(newStrength > 100)
              newStrength = 100;

            await userService.updatedUser(userEmail, "characterStats.stamina", newStamina);

            await userService.updatedUser(userEmail, "characterStats.agility", newAgility);

            const strength = await userService.updatedUser(userEmail, "characterStats.strength", newStrength);
            console.log(strength)

            const newUser = await userService.getOneUser(user.email)

            console.log("*********************RESTORED NEW USER*********************")
            console.log(newUser)
            newUserList.push(newUser[0]);

          }
          else{
            newUserList.push(user);
          }

        }

        io.emit("userList", newUserList);

      }
      catch(error){
        io.emit("error", error);
        console.log("*****************userList no se actualiza correctamente **************************")
      }

    })

    socket.on("fullyRestore", async(userEmail) => {
      //Wait time needed 
      
      const updatedUser = await userService.fullRestoreUser(userEmail)
      console.log('*********************user recovery updated user *********************')
      console.log(updatedUser)
      io.emit("userRecovery", updatedUser)
      const newUserList = await userService.getAllUsers();
      io.emit("userList", newUserList);
    })

    socket.on("sickUser", async(data) => {
      console.log
      const affectedUser = await userService.getOneUser(data.email);
      const disease = `diseases.${data.diseaseId}`
      const illness = await userService.updatedUser(data.email, disease, data.apply)
      const allUsers = await userService.getAllUsers()

      io.emit("userList", allUsers)
      
    })

    socket.on("objectRetrieval", async(data) => {
      console.log("*****************objectRetrieval*********************+")
      console.log(data)
      const updatedUser = await userService.verifyObject(data.email, data.num)
      console.log('*********************user updated *********************')
      console.log(updatedUser)

      const updatedObject = await objectService.openRetrieval(data.num);

      const newUserList = await userService.getAllUsers();

      const newObjectList = await objectService.getAllObjects();

      io.emit("userList", newUserList);
      io.emit("objectList", newObjectList);
      console.log(newObjectList)
    })


    socket.on("closeRip", async(data) => {
      const newObjectList = await objectService.closeRetrievals();
      const newUserList = await userService.emptyInventory();

      io.emit("userList", newUserList);
      io.emit("objectList", newObjectList);

    })



  }

 
  exports.socketEvents = events;


    //****************************penalizaciones (crono)*****************************************

