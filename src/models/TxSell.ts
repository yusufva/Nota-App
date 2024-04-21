import { IGeneralModels } from "./GeneralModel";
import { Guid } from "guid-typescript";

const INVALID_CONSTRUCTOR_PARAM =
    "nameOrObj arg must a string or an " +
    "object with the appropriate user keys.";

export interface ITxSell extends Omit<IGeneralModels, "updated_date"> {
    id: string | undefined;
    date: Date;
    nota_id: string;
    items: ISoldItems[];
    final_price: number;
}

export interface ISoldItems {
    id: number | undefined;
    tx_id: string | undefined;
    product_id: string;
    name: string;
    selling_price: number;
    quantity: number;
    total_price: number;
    created_date: Date;
}

function newTxSell(
    id: string | undefined,
    date: Date,
    nota_id: string,
    items: ISoldItems[],
    final_price: number
): ITxSell {
    return {
        id: id || Guid.create().toString(),
        date: date,
        nota_id: nota_id,
        items: items,
        final_price: final_price,
        created_date: new Date(),
    };
}

function fromTxSell(param: object): ITxSell {
    if (!isTxSell(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param as ITxSell;
    return newTxSell(p.id, p.date, p.nota_id, p.items, p.final_price);
}

function isTxSell(arg: unknown): boolean {
    return (
        !!arg &&
        typeof arg === "object" &&
        "id" in arg &&
        "date" in arg &&
        "nota_id" in arg &&
        "items" in arg &&
        "final_price" in arg
    );
}

export default {
    new: newTxSell,
    from: fromTxSell,
    is: isTxSell,
} as const;
