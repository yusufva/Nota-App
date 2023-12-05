import { ITxBuy } from '@src/models/TxBuy';

export type TxBuyDto = ITxBuy;

export type ItemsDto = {
    name: string;
    buying_price: number,
    quantity: number,
    total_price: number,
}

export type TxBuyResponseDto = {
    result: string;
    message: string;
    statusCode: number;
    data: TxBuyDto[]| TxBuyDto | null;
}

export type NewTxBuyRequestDto = {
    date: Date,
    items: ItemsDto[],
    final_price: number,
}

export type NewTxBuyResponseDto = {
    result: string;
    message: string;
    statusCode: number;
    data: TxBuyDto | null;
}