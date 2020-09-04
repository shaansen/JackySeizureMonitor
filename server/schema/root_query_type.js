const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const EventType = require('./event_type');
const Event = mongoose.model('event');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    events: {
      type: new GraphQLList(EventType),
      resolve() {
        return Event.find({});
      }
    },
    event: {
      type: EventType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Event.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
