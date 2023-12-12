import TxBuyReportRepo from '@src/repos/TxBuyReportRepo';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ITxBuy } from '@src/models/TxBuy';
import { TxBuyMonthReportRequestDto, 
	TxBuyMonthReportResponseDto, 
	TxBuyRangeReportRequestDto, 
	TxBuyRangeReportResponseDto } from '@src/Dto/TxBuyDto';

async function GetByMonth(date: TxBuyMonthReportRequestDto) 
    : Promise<TxBuyMonthReportResponseDto> {
	const tx : ITxBuy[] = await TxBuyReportRepo.GetByMonth(date.date);
	const response : TxBuyMonthReportResponseDto = {
		result: 'Success',
		message: 'Data Retrieve Successfully',
		statusCode: HttpStatusCodes.OK,
		data: tx,
	};
	return response;
}

async function GetByDate(date: TxBuyRangeReportRequestDto) 
    : Promise<TxBuyRangeReportResponseDto>{
	const tx : ITxBuy[] = await TxBuyReportRepo
		.GetByDate(date.startDate, date.endDate);
	const response : TxBuyRangeReportResponseDto = {
		result: 'Success',
		message: 'Data Retrieve Successfully',
		statusCode: HttpStatusCodes.OK,
		data: tx,
	};
	return response;
}

export default {
	GetByMonth,
	GetByDate,
} as const;