var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var uuid4 = require("uuid").v4;
var Database = require("better-sqlite3");
var db = new Database("./site-diary.db");
db.exec("\n  CREATE TABLE IF NOT EXISTS entries (\n    id TEXT PRIMARY KEY,\n    date TEXT NOT NULL,\n    description TEXT NOT NULL,\n    weather TEXT,\n    image TEXT\n  )\n");
var typeDefs = gql(__makeTemplateObject(["\n  type Entry {\n    id: ID!\n    date: String!\n    description: String!\n    weather: String\n    image: String!\n  }\n\n  type Query {\n    entries: [Entry!]!\n    entry(id: ID!): Entry\n  }\n\n  type Mutation {\n    createEntry(date: String!, description: String!, weather: String, image: String!): Entry!\n  }\n"], ["\n  type Entry {\n    id: ID!\n    date: String!\n    description: String!\n    weather: String\n    image: String!\n  }\n\n  type Query {\n    entries: [Entry!]!\n    entry(id: ID!): Entry\n  }\n\n  type Mutation {\n    createEntry(date: String!, description: String!, weather: String, image: String!): Entry!\n  }\n"]));
var resolvers = {
    Query: {
        entries: function () {
            var rows = db.prepare("SELECT * FROM entries").all();
            return rows;
        },
        entry: function (_, _a) {
            var id = _a.id;
            var row = db.prepare("SELECT * FROM entries WHERE id = ?").get(id);
            if (row) {
                return __assign({}, row);
            }
            return null;
        },
    },
    Mutation: {
        createEntry: function (_, _a) {
            var date = _a.date, description = _a.description, weather = _a.weather, image = _a.image;
            var id = uuid4();
            db.prepare("INSERT INTO entries (id, date, description, weather, image) VALUES (?, ?, ?, ?, ?)").run(id, date, description, weather, image);
            return { id: id, date: date, description: description, weather: weather, image: image };
        },
    },
};
var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80 Server ready at ".concat(url));
});
