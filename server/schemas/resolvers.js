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
    addUser: async (parent, { name, email, password }, context) => {
      if (context.user) {
        const profile = await User.create({ name, email, password });
        const token = signToken(profile);
        return { token, profile };
      }
      throw AuthenticationError;
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

    saveBook: async (parent, { bookId }, context) => {
      if (context.user) {
        // const book = await Book.findOne({ bookId });
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookId } },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
        { _id: context.user._id },
          { $pull: { savedBooks: bookId } },
          {
            new: true,
            runValidators: true,
          });
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
