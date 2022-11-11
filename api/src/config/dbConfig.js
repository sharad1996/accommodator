module.exports = (() => {
  const config = {
    development: {
      username: "root",
      password: "y",
      database: "map_api",
      host: "localhost",
      dialect: "mysql",
      // operatorsAliases: true,
      logging: false,
    },
    test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "postgres",
      // operatorsAliases: false,
    },
    production: {
      username: "yabsfadlkljrel",
      password:
        "8c433220f06437ee6bdf203bcccb9821acda9901546ce0a36e5c1ff7be00f17c",
      database: "dbqblutelakqvb",
      host: "ec2-54-221-214-183.compute-1.amazonaws.com",
      dialect: "postgres",
      ssl: false,
      // operatorsAliases: false,
      logging: false,
    },
  };

  if (process.env.NODE_ENV) {
    return config[process.env.NODE_ENV];
  }
  return config.development;
})();
