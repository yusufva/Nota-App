import { IGeneralModels } from './GeneralModel';
import { Guid } from 'guid-typescript';

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an ' + 
	'object with the appropriate user keys.';

export interface ITxSell extends Omit<IGeneralModels, 'updated_date'>{
    id: string|undefined;
    date: Date;
    items: ISoldItems[];
    final_price: number;
}

export interface ISoldItems extends Omit<IGeneralModels, 'updated_date'>{
    id: number|undefined;
    tx_id: string;
    product_id: string;
    name: string;
    selling_price: number;
    quantity: number;
    total_price: number
}

function newTxSell(
	id: string|undefined,
	date: Date,
	items: ISoldItems[],
	final_price: number,
): ITxSell {
	return {
		id: id || Guid.create().toString(),
		date: date,
		items: items,
		final_price: final_price,
		created_date: new Date(),
	};
}

function fromTxSell(param: object): ITxSell{
	if(!isTxSell(param)){
		throw new Error(INVALID_CONSTRUCTOR_PARAM);
	}
	const p = param as ITxSell;
	return newTxSell(p.id, p.date, p.items, p.final_price);
}

function isTxSell(arg: unknown): boolean{
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
	new: newTxSell,
	from: fromTxSell,
	is: isTxSell,
} as const;