const MessageType = require('./types/messageType')
const { neDBAll, neDBAdd } = require("../../../helpers");
const {GraphQLNonNull, GraphQLList} = require('graphql')
module.exports = {
    type: new GraphQLNonNull(new GraphQLList(MessageType)), 
    description: "This will retrieve a list of messages using neDB",
    resolve: async (parent, variables, context) => {
        const allData =  await neDBAll();
        console.log(allData)
        return allData;
    }
}