import TxBuyRepo from "@src/repos/TxBuyRepo";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {
    ItemsDto,
    NewTxBuyRequestDto,
    NewTxBuyResponseDto,
    TxBuyResponseDto,
} from "@src/Dto/TxBuyDto";
import { IBoughtItems, ITxBuy } from "@src/models/TxBuy";

async function GetAll(): Promise<TxBuyResponseDto> {
    const tx: ITxBuy[] = await TxBuyRepo.GetAll();
    const response: TxBuyResponseDto = {
        result: "Success",
        message: "Data Retrieve Successfully",
        statusCode: HttpStatusCodes.OK,
        data: tx,
    };
    return response;
}

async function GetById(id: string): Promise<TxBuyResponseDto> {
    const tx: ITxBuy | null = await TxBuyRepo.GetById(id);
    const response: NewTxBuyResponseDto = {
        result: "Success",
        message: "Data Retrieve Successfully",
        statusCode: HttpStatusCodes.OK,
        data: tx,
    };
    return response;
}

async function Create(tx: NewTxBuyRequestDto): Promise<NewTxBuyResponseDto> {
    const newItems: IBoughtItems[] = tx.items.map(
        (item: ItemsDto): IBoughtItems => {
            return {
                id: undefined,
                tx_id: undefined,
                product_id: item.product_id,
                name: item.name,
                buying_price: item.buying_price,
                quantity: item.quantity,
                total_price: item.total_price,
                created_date: new Date(),
            };
        }
    );
    const newTxBuy: ITxBuy = {
        id: undefined,
        date: tx.date,
        nota_id: tx.nota_id,
        final_price: tx.final_price,
        created_date: new Date(),
        items: newItems,
    };
    const create = await TxBuyRepo.Create(newTxBuy);
    const response: NewTxBuyResponseDto = {
        result: "Success",
        message: "Data Created Successfully",
        statusCode: HttpStatusCodes.CREATED,
        data: create,
    };
    return response;
}

export default {
    GetAll,
    GetById,
    Create,
} as const;
