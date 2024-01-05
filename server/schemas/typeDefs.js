const typeDefs = `
    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        me(userId: ID!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(authors: [String], description: String, title: String!, bookId: String!, image: String, link: String): User
        removeBook(bookId: String!): User
      }
`;

