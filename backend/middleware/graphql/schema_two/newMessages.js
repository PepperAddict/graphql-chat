const MessageType = require('./types/messageType')
const {GraphQLNonNull, GraphQLList} = require('graphql')
const { neDBAll, newSubscriber } = require("../../../helpers");
const { PubSub } = require("apollo-server-express");
const pubsub = new PubSub();

module.exports = {
    type: new GraphQLNonNull(new GraphQLList(MessageType)), 
    description: "This Subscription will watch for postMessage's changes",
    subscribe: async (parent, variables) => {
        const channel = "COOL";

        newSubscriber(async () => await pubsub.publish(channel, { newMessages: await neDBAll() }))
        
        // //send the data as soon as you enter
        setTimeout(async () => await pubsub.publish(channel, { newMessages: await neDBAll() }), 0);

        //turning on the subscription possibility to the channel
        return pubsub.asyncIterator(channel);
    }
}
