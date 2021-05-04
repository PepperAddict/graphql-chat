const { neDBAll, neDBAdd } = require("../../../helpers");
const resolvers = {
  Query: {
    getAllMessages: async (parent, variables, { database }) => {
      const allData = await neDBAll(database);
      console.log(allData)
      return allData;
    },
  },

  Mutation: {
    postMessage: async (parent, { name, message }, { database }) => {
      try {
        return await neDBAdd(database, { name, message }).then(() => {
          return true;
        });
      } catch (err) {
        return false;
      }
    },

  },

  // Subscription: {
  //   liveMessages: {
  //     subscribe: (payload, {}, {onMessages}) => {

  //       const SOMETHING_CHANGED_TOPIC = Math.random().toString(36).slice(2, 15);

  //       onMessages(async () =>
  //         pubsub.publish(SOMETHING_CHANGED_TOPIC, {
  //           message: await redis.lrange(room, 0, -1).then( async (res) => {
  //             return await parseMSG(res)
  //           }).catch((err) => console.log('two', err)),
  //         })
  //       );
  //       setTimeout(
  //         async () =>
  //           pubsub.publish(SOMETHING_CHANGED_TOPIC, {
  //             message: await redis.lrange(room, 0, -1).then(async (res) => {
  //               return await parseMSG(res)
  //             }).catch((err) => console.log('one', err)),
  //           }),
  //         0
  //       );

  //     },
  //   },
  // },
};

module.exports = { resolvers };
