module.exports = {
  db: process.env.db,
  sessionSecret: process.env.sessionSecret,
  consumerKey: process.env.consumerKey,
  consumerSecret: process.env.consumerSecret,
  token: process.env.token,
  tokenSecret: process.env.tokenSecret,
  PROD_DB: process.env.PROD_DB,
  facebook: {
      clientID: process.env.facebook_clientID,
      clientSecret: process.env.facebook_clientSecret,
      callbackURL: process.env.facebook_callbackURL
  }
};