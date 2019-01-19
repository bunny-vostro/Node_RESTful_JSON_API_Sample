/*
 * The main app router file
 *
 *
 *
 */

// Dependencies (NodeJS)
const fs = require('fs');
const path = require('path');
// Dependencies (local)
const _cliHelpper = require('../cli/cli.helper');

const routes = {};

const Router = function() {
  this.startFolder = null;
};

Router.prototype.load = function(app, folderName) {
  if (!this.startFolder) this.startFolder = path.basename(folderName);
  fs.readdirSync(folderName).forEach(file => {
    const fullName = path.join(folderName, file);
    const stat = fs.lstatSync(fullName);

    if (stat.isDirectory()) {
      // Recursively walk-through folders
      this.load(app, fullName);
    } else if (
      file.toLowerCase().indexOf('.js') ||
      file.toLowerCase().indexOf('.html')
    ) {
      // Grab path to JavaScript file and use it to construct the route

      let dirs = path.dirname(fullName).split(path.sep);

      if (dirs[0].toLowerCase() === this.startFolder.toLowerCase()) {
        dirs.splice(0, 1);
      }

      // Generate the route
      const baseRoute = '/' + dirs.join('/');
      this.logURI(baseRoute, fullName);

      // Load the JavaScript file ("controller") and pass the router to it
      const controllerClass = require('../' + fullName);

      // Associate the route with the router
      // app.use(baseRoute, router);
      app[baseRoute] = controllerClass;
    }
  });
};

Router.prototype.logHeader = () => {
  _cliHelpper.horizontalLine();
  _cliHelpper.centered('API URIs');
  _cliHelpper.horizontalLine();
};

Router.prototype.logURI = (baseRoute, fullName) => {
  console.log(
    '\x1b[32m%s\x1b[0m',
    'Created route: ' + baseRoute + ' for ' + fullName
  );
};

Router.prototype.logEnd = () => {
  _cliHelpper.horizontalLine('=');
};

const _routes = new Router();
_routes.logHeader();
_routes.load(routes, './controllers');
_routes.logEnd();

module.exports = routes;
