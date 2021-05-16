const { neDBAll, neDBAdd, newSubscriber, neDBRemove, subscribers } = require("../../../helpers");
//importing pubsub here since sending it as context kept saying it was undefined.
const { PubSub, GraphQLUpload } = require("apollo-server-express");
const pubsub = new PubSub();
const path = require('path')
const fs = require('fs')


const resolvers = {
  FileUpload: GraphQLUpload,
  Query: {
    getAllMessages: async (parent, variables) => {
      const allData = await neDBAll();
      return allData;
    },
  },

  Mutation: {
    postMessage: async (parent, { name, message, file }) => {
      let date = String(new Date())
      file = (file)? file: 'false'
      try {
        return await neDBAdd({ name, message, date, file })
          .then((res) => {
            //this will trigger the subscribers and give them the updated messages
            subscribers.forEach((fn) => fn())
            return true;
          })
          .catch((err) => console.log(err));
      } catch (err) {
        return false;
      }
    },
    removeMessage: async (parent, {_id}) => {
      try {
        return await neDBRemove(_id).then((res) => {
          subscribers.forEach((fn) => fn())
          return true;
        })
      } catch(err) {
        console.log(err)
        return false;
      }
    },

    uploadImage: async (parent, variables) => {
      //graphql upload doesn't work with subscription since it uses link. can't have more than one right now.
       
      const {createReadStream, filename, mimetype, encoding} = await variables; 
      const stream = fs.createReadStream();
      const pathname = path.join(__dirname, `../public/images/${filename}`)

      await stream.pipe(fs.createWriteStream(pathname))
      console.log(stream)
      return {url:`http://localhost:8080/images/${filename}` }
    }
  },
  Subscription: {
    newMessages: {
      subscribe: async () => {
        const channel = "COOL";

        newSubscriber(async () => await pubsub.publish(channel, { newMessages: await neDBAll() }))
        
        // //send the data as soon as you enter
        setTimeout(async () => await pubsub.publish(channel, { newMessages: await neDBAll() }), 0);

        //turning on the subscription possibility to the channel
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

module.exports = { resolvers };
