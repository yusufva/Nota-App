import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import TxSellService from '@src/services/TxSellService';
import Paths from '@src/constants/Paths';
import { Router } from 'express';
import { IReq, IRes } from './types/express/misc';
import { NewTxSellRequestDto } from '@src/Dto/TxSellDto';
// import jetValidator from 'jet-validator';

const router = Router()/* ,
	validate = jetValidator() */;

router.get(Paths.TxSell.Get, async (_: IReq, res: IRes) => {
	const response = await TxSellService.GetAll();
	res.status(HttpStatusCodes.OK).json(response);
});

router.get(Paths.TxSell.Get + '/:id', 
	async (req: IReq<{ id: string }>, res: IRes) => {
		const response = await TxSellService.GetById(req.params.id);
		res.status(HttpStatusCodes.OK).json(response);
	});

router.post(Paths.TxSell.Create, 
	// eslint-disable-next-line max-len
	/* validate(['date', 'date'],['final_price','number'], ['items','array']), */ 
	async (req: IReq<NewTxSellRequestDto>, res: IRes) => {
		const response = await TxSellService.Create(req.body);
		res.status(HttpStatusCodes.CREATED).json(response);
	});

export default router;