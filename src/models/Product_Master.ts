// **** Variables **** //

import { IGeneralModels } from "./GeneralModel";
import { Guid } from "guid-typescript";

const INVALID_CONSTRUCTOR_PARAM =
    "nameOrObj arg must a string or an " +
    "object with the appropriate user keys.";

export interface IProductMaster extends IGeneralModels {
    id: string | undefined;
    name: string;
    stock: IProductStock | null;
    buying_price: number;
    selling_price: number;
}

export interface IProductStock {
    id: string | undefined;
    quantity: number;
    satuan: string;
    created_date: Date;
    updated_date: Date;
}

function newProduct(
    name?: string,
    stock?: IProductStock | null,
    buying_price?: number,
    selling_price?: number,
    id?: undefined | string
): IProductMaster {
    return {
        id: id || Guid.create().toString(),
        name: name || "",
        stock: stock || null,
        buying_price: buying_price || 0,
        selling_price: selling_price || 0,
        created_date: new Date(),
        updated_date: new Date(),
    };
}

function fromProduct(param: object): IProductMaster {
    if (!isProduct(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param as IProductMaster;
    return newProduct(p.name, p.stock, p.buying_price, p.selling_price, p.id);
}

function isProduct(arg: unknown): boolean {
    return (
        !!arg &&
        typeof arg === "object" &&
        "id" in arg &&
        "name" in arg &&
        "buying_price" in arg &&
        "selling_price" in arg
    );
}

export default {
    new: newProduct,
    from: fromProduct,
    isProduct,
} as const;
