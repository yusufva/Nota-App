import { Router } from 'express';

import Paths from '../constants/Paths';
import Product from './ProductMasterRoutes';
import Stock from './StockRoutes';


// **** Variables **** //

const apiRouter = Router();

// Add Product Master Router
apiRouter.use(Paths.ProductMaster.Base, Product);

// Add Stock Router
apiRouter.use(Paths.Stock.Base, Stock);


// **** Export default **** //

export default apiRouter;
