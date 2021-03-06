/**
 * Hapi.js server.
 *
 * @type {exports}
 */

var Hapi = require('hapi');
var modules = require('./modules');

var cluster = require('cluster');


if (cluster.isMaster) {


    // Create a workers
    for (var i = 0; i < 20; i += 1) {
        cluster.fork();
    }

// Code to run if we're in a worker process
} else {
  // Instantiate the server
  var server = new Hapi.Server();

  server.connection({
      port: 3000,
      routes: {
          cors: true,
      }
  });


  /**
   * The hapijs plugins that we want to use and their configs
   */
  // TODO: Implement ability to add plugins via generator
   var plugins = [
  //   {
  //     plugin: require('lout')
  //   }
   ];

  /**
   * Setup the server with plugins
   */
  server.register(plugins, function(err) {

    // If there is an error on server startup
    if(err) {
      throw err;
    }

    /**
     * Make sure if this script is being required as a module by another script, we don't start the server.
     */
    if(!module.parent) {

      /**
       * Starts the server
       */
      server.start(function () {
        console.log('Hapi server worker ' + cluster.worker.id + ' started @', server.info.uri);
      });
    }

  });

  /**
   * Add all the modules within the modules folder
   */
  for(var route in modules) {
    server.route(modules[route]);
  }


  /**
   * Expose the server's methods when used as a require statement
   *
   * @type {exports.server}
   */
  module.exports = server;

}
