const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

const schema = buildSchema(`
  schema {
    query: Query
  }

  type Query {
    hello: String,
    group(id: ID): Group,
  }

  type Group {
    name: String
  }
`);

const groups = [
  { name: 'BTOB' },
  { name: 'SHINee' },
];

// The root provides a resolver function for each API endpoint
const rootValue = {
  hello: () => 'Hi!',
  group: (args) => groups[args.id],
};

app.use('/assets', express.static('assets'));

app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.listen(3000, () => console.log('graphql running at localhost:3000/graphql'));
