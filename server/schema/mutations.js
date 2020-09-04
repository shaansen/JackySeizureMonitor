const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require("mongoose");
const Event = mongoose.model("event");
const EventType = require("./event_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addEvent: {
      type: EventType,
      args: {
        date: { type: GraphQLString },
      },
      resolve(parentValue, { date }) {
        return new Event({ date }).save();
      },
    },
    deleteEvent: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Event.remove({ _id: id });
      },
    },
  },
});

module.exports = mutation;
