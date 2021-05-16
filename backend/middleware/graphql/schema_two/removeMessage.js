const { neDBRemove, subscribers } = require("../../../helpers");
const { GraphQLNonNull, GraphQLID, GraphQLBoolean } = require("graphql");

module.exports = {
  type: new GraphQLNonNull(GraphQLBoolean),
  description: "This Mutation will remove a message",
  args: {
    _id: {type: GraphQLNonNull(GraphQLID)},
  },
   resolve: async (parent, {_id}) => {
    file = file ? file : "false";
    try {
      return await neDBRemove({ _id})
        .then((res) => {
          //this will trigger the subscribers and give them the updated messages
          subscribers.forEach((fn) => fn());
          return true;
        })
        .catch((err) => console.log(err));
    } catch (err) {
      return false;
    }
  },
};
