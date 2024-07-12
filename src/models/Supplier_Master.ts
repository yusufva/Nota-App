import { IGeneralModels } from "./GeneralModel";
import { ITxBuy } from "./TxBuy";

const INVALID_CONSTRUCTOR_PARAM =
    "nameOrObj arg must a string or an " +
    "object with the appropriate user keys.";

export interface ISupplierMaster extends IGeneralModels {
    id: number | undefined;
    nama: string;
    alamat: string;
    cp: string;
    nota: ITxBuy[] | undefined;
}

function newSupplier(
    id: number | undefined,
    nama: string,
    alamat: string,
    cp: string,
    nota: ITxBuy[] | undefined
): ISupplierMaster {
    return {
        id: id,
        nama: nama,
        alamat: alamat,
        cp: cp,
        nota: nota,
        created_date: new Date(),
        updated_date: new Date(),
    };
}

function fromTxBuy(param: object): ISupplierMaster {
    if (!isSupplier(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param as ISupplierMaster;
    return newSupplier(p.id, p.nama, p.alamat, p.cp, p.nota);
}

function isSupplier(arg: unknown): boolean {
    return (
        !!arg &&
        typeof arg === "object" &&
        "id" in arg &&
        "nama" in arg &&
        "alamat" in arg &&
        "cp" in arg &&
        "nota" in arg
    );
}

export default {
    new: newSupplier,
    from: fromTxBuy,
    isSupplier,
} as const;
