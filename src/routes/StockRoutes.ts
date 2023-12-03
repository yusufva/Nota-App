import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import StockService from '@src/services/StockService';
import Paths from '@src/constants/Paths';
import { Router } from 'express';
import { IReq, IRes } from './types/types';
import { NewStockRequestDto } from '@src/Dto/StockDto';
import jetValidator from 'jet-validator';

const router = Router(),
	validate = jetValidator();

router.get(Paths.Stock.Get, async (_: IReq, res: IRes) => {
	const stock = await StockService.GetAll();
	return res.status(HttpStatusCodes.OK).json(stock);
});

router.get(Paths.Stock.GetById, async (req: IReq, res: IRes) => {
	const { id } = req.params;
	const stock = await StockService.GetById(id);
	return res.status(HttpStatusCodes.OK).json(stock);
});

router.put(Paths.Stock.Update, validate(['id', 'string', 'params'],['quantity','number']), async (req: IReq<NewStockRequestDto>, res: IRes) => {
	const { id } = req.params;
	const stock = req.body;
	const updateStock : NewStockRequestDto = {
		quantity: stock.quantity,
	};
	const result = await StockService.UpdateStockById(updateStock, id);
	return res.status(HttpStatusCodes.OK).json(result);
});

export default router;