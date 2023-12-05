import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import TxBuyService from '@src/services/TxBuyService';
import Paths from '@src/constants/Paths';
import { Router } from 'express';
import { IReq, IRes } from './types/express/misc';
import { NewTxBuyRequestDto } from '@src/Dto/TxBuyDto';
import jetValidator from 'jet-validator';

const router = Router(),
	validate = jetValidator();

router.get(Paths.Stock.Get, async (_: IReq, res: IRes) => {
	const stock = await TxBuyService.GetAll();
	return res.status(HttpStatusCodes.OK).json(stock);
});

router.get(Paths.Stock.GetById, async (req: IReq, res: IRes) => {
	const { id } = req.params;
	const stock = await TxBuyService.GetById(id);
	return res.status(HttpStatusCodes.OK).json(stock);
});

router.post(Paths.TxBuy.Create, 
	validate(['date', 'date'],['final_price','number'], ['items','array']), 
	async (req: IReq<NewTxBuyRequestDto>, res: IRes) => {
		const tx = req.body;
		const newTxBuy = await TxBuyService.Create(tx);
		return res.status(HttpStatusCodes.CREATED).json(newTxBuy);
	});


export default router;