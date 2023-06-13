module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ["nativewind/babel"],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};

//translate react code into pure javascript code
