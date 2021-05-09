const { neDBAll, neDBAdd } = require("../../helpers");
//importing pubsub here since sending it as context kept saying it was undefined.
const { PubSub } = require("apollo-server-express");
const pubsub = new PubSub();
//for nedb
const Datastore = require("nedb");
const database = new Datastore("database.db");
database.loadDatabase();



//our subscribers for our subscription
const subscribers = [];
//the function that adds a new subscriber
const newSubscriber = (fn) => subscribers.push(fn);

const resolvers = {
  Query: {
    getAllMessages: async (parent, variables) => {
      const allData = await neDBAll(database);

      return allData;
    },
  },

  Mutation: {
    postMessage: async (parent, { name, message }) => {
      
      try {
        return await neDBAdd(database, { name, message })
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
  },
  Subscription: {
    newMessages: {
      subscribe: async () => {
        const channel = "COOL";

        newSubscriber(async () => await pubsub.publish(channel, { newMessages: await neDBAll(database) }))
        
        // //send the data as soon as you enter
        setTimeout(async () => await pubsub.publish(channel, { newMessages: await neDBAll(database) }), 0);

        //turning on the subscription possibility to the channel
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

module.exports = { resolvers };
