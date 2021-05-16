const { neDBAdd, subscribers } = require("../../../helpers");
const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");

module.exports = {
  type: new GraphQLNonNull(GraphQLBoolean),
  description: "This Mutation will post a message",
  args: {
    name: {type: GraphQLNonNull(GraphQLString)},
    message: {type: GraphQLNonNull(GraphQLString)},
    file: {type: GraphQLString}
  },
   resolve: async (parent, {name, message, file}) => {
    let date = String(new Date());
    file = file ? file : "false";
    try {
      return await neDBAdd({ name, message, date, file })
        .then((res) => {
          //this will trigger the subscribers and give them the updated messages
          subscribers.forEach((fn) => fn());
          return true;
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err)
      return false;
    }
  },
};
