import { Router } from 'express';

import Paths from '../constants/Paths';
import Product from './ProductMasterRoutes';


// **** Variables **** //

const apiRouter = Router();

// Add Product Master Router
apiRouter.use(Paths.ProductMaster.Base, Product);


// **** Export default **** //

export default apiRouter;
