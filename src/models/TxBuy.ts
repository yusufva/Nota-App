import { IGeneralModels } from './GeneralModel';
import { Guid } from 'guid-typescript';

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an ' + 
	'object with the appropriate user keys.';

export interface ITxBuy extends Omit<IGeneralModels, 'updated_date'> {
    id: string|undefined;
    date: Date;
    items: IBoughtItems[];
    final_price: number;
}

export interface IBoughtItems{
    id: number | undefined;
    tx_id: string | undefined;
	product_id: string;
    name: string;
    buying_price: number;
    quantity: number;
    total_price: number;
    created_date: Date;
}

function newTxBuy(
	id: string|undefined,
	date: Date,
	items: IBoughtItems[],
	final_price: number,
): ITxBuy {
	return {
		id: id || Guid.create().toString(),
		date: date,
		items: items,
		final_price: final_price,
		created_date: new Date(),
	};
}

function fromTxBuy(param: object): ITxBuy{
	if(!isTxBuy(param)){
		throw new Error(INVALID_CONSTRUCTOR_PARAM);
	}
	const p = param as ITxBuy;
	return newTxBuy(p.id, p.date, p.items, p.final_price);
}

function isTxBuy(arg: unknown): boolean{
	return (
		!!arg &&
        typeof arg === 'object' &&
        'id' in arg &&
        'date' in arg &&
        'items' in arg &&
        'final_price' in arg
	);
}

export default{
	new: newTxBuy,
	from: fromTxBuy,
	isTxBuy,
} as const;