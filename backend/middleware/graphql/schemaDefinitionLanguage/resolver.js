const { neDBAll, neDBAdd } = require("../../../helpers");

//importing pubsub here since sending it as context kept saying it was undefined. 
const { PubSub } = require("apollo-server-express");
const pubsub = new PubSub();

const POST_CREATED = "KEY";

const resolvers = {
  Query: {
    getAllMessages: async (parent, variables, { database }) => {
      const allData = await neDBAll(database);

      return allData;
    },
  },

  Mutation: {
    postMessage: async (parent, { name, message }, { database }) => {
      try {
        return await neDBAdd(database, { name, message }).then(
          ({ _id, name, message }) => {
            
            //this will publish our message to our subscription
            pubsub.publish(POST_CREATED, {
              newMessages: {
                _id,
                name,
                message,
              },
            });
            
            return true;
          }
        );
      } catch (err) {
        return false;
      }
    },
  },
  Subscription: {
    newMessages: {
      subscribe: () => pubsub.asyncIterator(POST_CREATED),
    },
  },
};

module.exports = { resolvers };
