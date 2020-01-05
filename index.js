const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
const port = process.env.PORT || 5000;

const typeDefs = gql`
    type Query{
        hello: String
    }
`
const resolvers = {
    Query: {
        hello: () => 'Hello World!'
    }
}