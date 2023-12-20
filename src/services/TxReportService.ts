import TxReportRepo from '@src/repos/TxReportRepo';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ITxBuy } from '@src/models/TxBuy';
import { TxBuyMonthReportRequestDto, 
	TxBuyMonthReportResponseDto, 
	TxBuyRangeReportRequestDto, 
	TxBuyRangeReportResponseDto } from '@src/Dto/TxBuyDto';
import { TxSellMonthReportRequestDto, 
	TxSellMonthReportResponseDto, 
	TxSellRangeReportRequestDto, 
	TxSellRangeReportResponseDto } from '@src/Dto/TxSellDto';
import { ITxSell } from '@src/models/TxSell';

async function GetTxBuyByMonth(date: TxBuyMonthReportRequestDto) 
    : Promise<TxBuyMonthReportResponseDto> {
	const tx : ITxBuy[] = await TxReportRepo.GetTxBuyByMonth(date.date);
	const response : TxBuyMonthReportResponseDto = {
		result: 'Success',
		message: 'Data Retrieve Successfully',
		statusCode: HttpStatusCodes.OK,
		data: tx,
	};
	return response;
}

async function GetTxBuyByDate(date: TxBuyRangeReportRequestDto) 
    : Promise<TxBuyRangeReportResponseDto>{
	const tx : ITxBuy[] = await TxReportRepo
		.GetTxBuyByDate(date.startDate, date.endDate);
	const response : TxBuyRangeReportResponseDto = {
		result: 'Success',
		message: 'Data Retrieve Successfully',
		statusCode: HttpStatusCodes.OK,
		data: tx,
	};
	return response;
}

async function GetTxSellByMonth(date: TxSellMonthReportRequestDto) 
    : Promise<TxSellMonthReportResponseDto> {
	const tx : ITxSell[] = await TxReportRepo.GetTxSellByMonth(date.date);
	const response : TxSellMonthReportResponseDto = {
		result: 'Success',
		message: 'Data Retrieve Successfully',
		statusCode: HttpStatusCodes.OK,
		data: tx,
	};
	return response;
}

async function GetTxSellByDate(date: TxSellRangeReportRequestDto) 
    : Promise<TxSellRangeReportResponseDto>{
	const tx : ITxSell[] = await TxReportRepo
		.GetTxSellByDate(date.startDate, date.endDate);
	const response : TxSellRangeReportResponseDto = {
		result: 'Success',
		message: 'Data Retrieve Successfully',
		statusCode: HttpStatusCodes.OK,
		data: tx,
	};
	return response;
}

export default {
	GetTxBuyByDate,
	GetTxBuyByMonth,
	GetTxSellByDate,
	GetTxSellByMonth,
} as const;