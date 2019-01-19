var lib = function(data, callback) {
  console.log('HELLO');
  const welcomeMessage = {
    Message: 'Welcome !'
  };
  callback(200, welcomeMessage);
};

module.exports = lib;
