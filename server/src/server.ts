const { ApolloServer, gql } = require('apollo-server');
const { v4: uuid4 } = require("uuid");
const Database = require("better-sqlite3");

const db = new Database("./site-diary.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS entries (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    weather TEXT,
    image TEXT
  )
`);

interface Entry {
    id: string;
    date: string;
    description: string;
    weather?: string;
    image?: string;
}

const typeDefs = gql`
  type Entry {
    id: ID!
    date: String!
    description: String!
    weather: String
    image: String!
  }

  type Query {
    entries: [Entry!]!
    entry(id: ID!): Entry
  }

  type Mutation {
    createEntry(date: String!, description: String!, weather: String, image: String!): Entry!
  }
`;

const resolvers = {
    Query: {
        entries: (): Entry[] => {
            const rows = db.prepare("SELECT * FROM entries").all();
            return rows;
        },
        entry: (_: unknown, { id }: { id: string }): Entry | null => {
            const row = db.prepare("SELECT * FROM entries WHERE id = ?").get(id);
            if (row) {
                return {
                    ...row,
                };
            }
            return null;
        },
    },
    Mutation: {
        createEntry: (
            _: unknown,
            {
                date,
                description,
                weather,
                image,
            }: { date: string; description: string; weather?: string; image?: string }
        ): Entry => {
            const id = uuid4();
            db.prepare(
                "INSERT INTO entries (id, date, description, weather, image) VALUES (?, ?, ?, ?, ?)"
            ).run(id, date, description, weather, image);
            return { id, date, description, weather, image };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀 Server ready at ${url}`);
});
