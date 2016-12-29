import {Router, Request, Response, NextFunction} from 'express';

const Drinks = require('../data/drinks').mockedDrinks;

export class DrinksRouter {
  router: Router

  /**
   * Initialize the DrinksRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all drinks.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.status(200).json(Drinks);
  }

  /**
   * GET one drink by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let query = parseInt(req.params.id);
    let drink = Drinks.find(drink => drink.id === query);
    if (drink) {
      res.status(200)
        .json(drink);
    }
    else {
      res.status(404)
        .send({
          message: 'No drink found with the given id.',
          status: res.status
        });
    }
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
  }
}

// Create the DrinksRouter, and export its configured Express.Router
const drinksRoutes = new DrinksRouter();
drinksRoutes.init();

export default drinksRoutes.router;