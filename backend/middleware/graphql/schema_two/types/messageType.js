const {GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString} = require('graphql')

const MessageType = new GraphQLObjectType({
    name: "Message",
    fields: () => {
        return {
            _id: {type:GraphQLNonNull(GraphQLID)},
            name: {type: GraphQLNonNull(GraphQLString)},
            date: {type: GraphQLNonNull(GraphQLString)},
            message: {type: GraphQLNonNull(GraphQLString)},
            file: {type: GraphQLString}
        }
    }
})

module.exports = MessageType