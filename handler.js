'use strict';
const { putParameter } = require("./aws");
const tokenService = require("./tokenService");
const Rollbar = require("rollbar");

var rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
});

module.exports.index = async event => {

  try {
    const token = await tokenService.getToken();
    const { access_token, expires_in, token_type } = token;
      
    const result = await putParameter(access_token)
    console.log(result);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `token saved ${JSON.stringify(result)}`,
        },
        null,
        2
      ),
    };
  }catch (err) {
    rollbar.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: err,
        },
        null,
        2
      ),
    };
  }
};
