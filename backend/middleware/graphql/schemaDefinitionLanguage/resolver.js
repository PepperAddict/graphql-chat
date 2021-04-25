const resolvers = {
    Query: {
      getAllMessages: async (parent, args, {database} ) => {
        const data = [];
        await database.find({}, (err, docs) =>{
          
          for (let doc of docs) {

           data.push({
              id: doc._id,
              user: doc.name,
              message: doc.message
            }) 

          }
        })
        console.log(data);
        return data;

      },

    },
  
    // Mutation: {
    //   postMessage: async (parent, { user, content, room }) => {
    //     let process = await postMSG(room, user, content)
    //     subscribers.forEach((fn) => fn());
    //     return process;
    //   },
    // },
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

  module.exports = {resolvers}