import { IStock } from "@src/models/Stock";

export type StockDto = IStock;

export type StockResponseDto = {
    result: string;
    message: string;
    statusCode: number;
    data: StockDto[];
};

export type NewStockResponseDto = {
    result: string;
    message: string;
    statusCode: number;
    data: StockDto | null;
};

export type NewStockRequestDto = {
    quantity: number;
    satuan: string;
};
