const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, { userId }) => {
        return User.findOne({ _id: userId })
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },

    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(profile);
      return { token, profile };
    },

    saveBook: async (parent,  { bookId, userId }) => {
      const book = await Book.findOne({ bookId });
      return User.findOneAndUpdate({_id: userId}, { $addToSet: { savedBooks: book }}, {
        new: true,
        runValidators: true,
      })

    },

    removeBook: async (parent, { bookId }) => {
      return Book.findOneAndDelete({ bookId });
    },
  },
};

module.exports = resolvers;
