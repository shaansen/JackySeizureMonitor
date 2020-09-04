const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Event = mongoose.model('event');

const EventType = new GraphQLObjectType({
  name:  'EventType',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString },
  })
});

module.exports = EventType;
