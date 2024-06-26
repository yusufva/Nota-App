// **** Variables **** //

import { IGeneralModels } from "./GeneralModel";
import { Guid } from "guid-typescript";

const INVALID_CONSTRUCTOR_PARAM =
    "nameOrObj arg must a string or an " +
    "object with the appropriate user keys.";

export interface IStock extends IGeneralModels {
    id: string | undefined;
    quantity: number;
    satuan: string;
}

function newStock(
    id: string | undefined,
    quantity: number,
    satuan: string
): IStock {
    return {
        id: id || Guid.create().toString(),
        quantity: quantity,
        satuan: satuan,
        created_date: new Date(),
        updated_date: new Date(),
    };
}

function fromStock(param: object): IStock {
    if (!isStock(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param as IStock;
    return newStock(p.id, p.quantity, p.satuan);
}

function isStock(arg: unknown): boolean {
    return (
        !!arg &&
        typeof arg === "object" &&
        "id" in arg &&
        "quantity" in arg &&
        "satuan" in arg
    );
}

export default {
    new: newStock,
    from: fromStock,
    isStock,
} as const;
