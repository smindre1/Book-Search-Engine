const typeDefs = `
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        password: String
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
      }

    input BookContent {
        bookId: ID!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String! password: String!): Auth
        saveBook(bookInfo: BookContent!): User
        removeBook(bookId: ID!): User
      }
`;

module.exports = typeDefs;