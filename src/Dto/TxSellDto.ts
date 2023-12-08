import { ITxSell } from '@src/models/TxSell';

export type TxSellDto = ITxSell

export type ItemsDto = {
    name: string;
    product_id: string,
    selling_price: number,
    quantity: number,
    total_price: number,
}

export type TxSellResponseDto = {
    result: string;
    message: string;
    statusCode: number;
    data: TxSellDto[] | TxSellDto | null;
}

export type NewTxSellRequestDto = {
    date: Date,
    items: ItemsDto[],
    final_price: number,
}

export type NewTxSellResponseDto = {
    result: string;
    message: string;
    statusCode: number;
    data: TxSellDto | null;
}

