import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import DrinksRouter from './routes/DrinksRouter';

// Creates and configures an ExpressJS web server.
class App {

  private defaultRoute: string = '/'; 
  private drinksApiRoute: string = '/api/drinks';

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get(this.defaultRoute, (req, res, next) => {
      res.json({
        message: `Api is on ${this.drinksApiRoute}`
      });
    });
    this.express.use(this.defaultRoute, router);
    this.express.use(this.drinksApiRoute, DrinksRouter);
  }

}


export default new App().express;