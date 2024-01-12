const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
     throw AuthenticationError;
    },

  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      
      const token = signToken(profile);
      return { token, profile };
    },

    saveBook: async (parent, { bookInfo }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookInfo } },
          {
            new: true,
          }
        );
      }
      throw AuthenticationError;
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const result = User.findOneAndUpdate(
        { _id: context.user._id },
          { $pull: { savedBooks:  bookId } },
          {
            new: true,
          });
          return result;
      }
      

      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
