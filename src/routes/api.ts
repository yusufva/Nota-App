import { Router } from 'express';

import Paths from '../constants/Paths';
import Product from './ProductMasterRoutes';
import Stock from './StockRoutes';
import TxBuy from './TxBuyRoutes';
import TxSell from './TxSellRoutes';
import TxBuyReport from './TxBuyReportRoutes';


// **** Variables **** //

const apiRouter = Router();

// Add Product Master Router
apiRouter.use(Paths.ProductMaster.Base, Product);

// Add Stock Router
apiRouter.use(Paths.Stock.Base, Stock);

// Add Tx Buy Router
apiRouter.use(Paths.TxBuy.Base, TxBuy);

// Add Tx Sell Router
apiRouter.use(Paths.TxSell.Base, TxSell);

// Add Tx Buy Report Router
apiRouter.use(Paths.report.Base, TxBuyReport);

// **** Export default **** //

export default apiRouter;
