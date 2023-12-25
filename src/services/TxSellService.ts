import TxSellRepo from '@src/repos/TxSellRepo';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ItemsDto, NewTxSellRequestDto, 
	NewTxSellResponseDto, 
	TxSellResponseDto } from '@src/Dto/TxSellDto';
import { ISoldItems, ITxSell } from '@src/models/TxSell';

async function GetAll(): Promise<TxSellResponseDto>{
	const tx : ITxSell[] = await TxSellRepo.GetAll();
	const response : TxSellResponseDto = {
		result: 'Success',
		message: 'Data Retrieve Successfully',
		statusCode: HttpStatusCodes.OK,
		data: tx,
	};
	return response;
}

async function GetById(id:string):Promise<TxSellResponseDto>{
	const tx : ITxSell | null = await TxSellRepo.GetById(id);
	const response:NewTxSellResponseDto = {
		result: 'Success',
		message: 'Data Retrieve Successfully',
		statusCode: HttpStatusCodes.OK,
		data: tx,
	};
	return response;
}

async function Create(tx:NewTxSellRequestDto):Promise<NewTxSellResponseDto>{
	const newItem : ISoldItems[] = tx.items.map(
		(item : ItemsDto) : ISoldItems=>{
			return {
				id: undefined,
				tx_id: undefined,
				product_id: item.product_id,
				name: item.name,
				selling_price: item.selling_price,
				quantity: item.quantity,
				total_price: item.total_price,
				created_date: new Date(),
			};
		});
	const newTxSell:ITxSell = {
		id: undefined,
		date: tx.date,
		final_price: tx.final_price,
		created_date: new Date(),
		items: newItem,
	};
	const create = await TxSellRepo.Create(newTxSell);
	const response:NewTxSellResponseDto = {
		result: 'Success',
		message: 'Data Created Successfully',
		statusCode: HttpStatusCodes.CREATED,
		data: create,
	};
	return response;
}

export default{
	GetAll,
	GetById,
	Create,
} as const;