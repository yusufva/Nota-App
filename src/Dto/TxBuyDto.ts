import { ITxBuy } from "@src/models/TxBuy";

export type TxBuyDto = ITxBuy;

export type ItemsDto = {
    name: string;
    product_id: string;
    buying_price: number;
    quantity: number;
    total_price: number;
};

export type TxBuyResponseDto = {
    result: string;
    message: string;
    statusCode: number;
    data: TxBuyDto[] | TxBuyDto | null;
};

export type NewTxBuyRequestDto = {
    date: Date;
    nota_id: string;
    items: ItemsDto[];
    final_price: number;
};

export type NewTxBuyResponseDto = {
    result: string;
    message: string;
    statusCode: number;
    data: TxBuyDto | null;
};

export type TxBuyRangeReportRequestDto = {
    startDate: Date;
    endDate: Date;
};

export type TxBuyRangeReportResponseDto = {
    result: string;
    message: string;
    statusCode: number;
    data: TxBuyDto[] | null;
};

export type TxBuyMonthReportRequestDto = {
    date: Date;
};

export type TxBuyMonthReportResponseDto = {
    result: string;
    message: string;
    statusCode: number;
    data: TxBuyDto[] | null;
};
