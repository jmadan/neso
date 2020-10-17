const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-southeast-2" });

let SSM = new AWS.SSM({ apiVersion: "2014-11-06" });

const putParameter = (valueString) => {

  var params = {
    Name: 'auth0Token',
    Value: valueString,
    Overwrite: true,
    Type: 'SecureString'
  };
  
  return SSM.putParameter(params).promise();
};

module.exports = {
  putParameter,
};
