// This is a file generated by the yeoman generator hapijs

/**
 * All the endpoints for anything related to foo
 *
 * @type {exports}
 */
var Joi = require('joi');
var fooController = require('./foo-ctrl');

module.exports = function() {
  return [
    {
      method: 'POST',
      path: '/foos',
      config: {
        description: 'Creates a foo',
        handler: fooController.create,
        validate: {
          payload: {
            // TODO: Add some validations
          }
        }
      }
    },

    {
      method: 'GET',
      path: '/foos',
      config : {
        description: 'Fetches all foos',
        handler: fooController.find
      }
    },

    {
      method: 'GET',
      path: '/foos/{id}',
      config : {
        description: 'Fetches a foo by id',
        handler: fooController.findById,
        validate: {
          params: {
            id: Joi.number().integer().required()
          }
        }
      }
    },

    {
      method: 'PUT',
      path: '/foos/{id}',
      config : {
        description: 'Updates a foo for a specific id',
        handler: fooController.update,
        validate: {
          params: {
            id: Joi.number().integer().required()
          },
          payload: {
            // TODO: Add some validations
          }
        }
      }
    },

    {
      method: 'DELETE',
      path: '/foos/{id}',
      config : {
        description: 'Remove a foo for a specific id',
        handler: fooController.remove,
        validate: {
          params: {
            id: Joi.number().integer().required()
          }
        }
      }
    }

		,

		{
			method: 'GET',
			path: '/sleep/{time}',
			config : {
				description: 'sleep x ms then return flow',
				handler: fooController.sleepController
			}
		}
		/* Add new methods above */
  ]
}();
