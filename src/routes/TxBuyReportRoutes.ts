import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import TxBuyReportService from '@src/services/TxBuyReportService';
import { Router } from 'express';
import { IReq, IRes } from './types/express/misc';
import { TxBuyMonthReportRequestDto, 
	TxBuyRangeReportRequestDto } from '@src/Dto/TxBuyDto';
import jetValidator from 'jet-validator';
import Paths from '@src/constants/Paths';

const router = Router(),
	validate = jetValidator();

router.post(Paths.report.TxBuy.Base + '/' + Paths.report.TxBuy.GetByDate, 
	validate(['startDate', 'date'], ['endDate', 'date']),
	async (req: IReq<TxBuyRangeReportRequestDto>, res: IRes) => {
		const response = await TxBuyReportService.GetByDate(req.body);
		res.status(HttpStatusCodes.OK).json(response);
	});

router.post(Paths.report.TxBuy.Base + '/' + Paths.report.TxBuy.GetByMonth, 
	validate(['date', 'date']), 
	async (req: IReq<TxBuyMonthReportRequestDto>, res: IRes) => {
		const response = await TxBuyReportService.GetByMonth(req.body);
		res.status(HttpStatusCodes.OK).json(response);
	});

export default router;