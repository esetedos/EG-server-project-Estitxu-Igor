const User = require('../../src/services/userServices')
const artifactService = require('../../src/services/artifactService')
const searchService = require('../../src/services/searchService')

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



    socket.on('disconnect', () => {
      console.log('Client disconnected: ', socket.id);
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
        // const k = await User.getAllUsers();
        // console.log(k);
        console.log(arg); // id and true/false
        token.token  =arg;
        console.log(token)
        const decodedUser = await User.verifyUser(token);
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

        console.log('************ ALL DATA ****************')
        console.log(allData)

        for(const artifact of artifactsArray){
          if(foundData.isFound === true && artifact.name === foundData.artifactName && foundData.foundByEmail !== "reboot"){
            await artifactService.updateArtifact(foundData.artifactName, true, foundData.foundByEmail)
          }
          else if(foundData.foundByEmail === "reboot"){
            await artifactService.updateArtifact(artifact.name, false, foundData.foundByEmail)
          }
        };
        console.log('************ FINISHES FOR OF ARTIFACTS ******************')
        io.emit("artifacts", artifactsArray)
        console.log('************ SOCKET ARRAY EMIT DONE ******************')
      }
      catch (error){
        io.emit("error", error)
        console.log('************ ALL DATA ****************')
        console.log(allData)
      }

    })

  }

  exports.socketEvents = events;



