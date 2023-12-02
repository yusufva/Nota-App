import { IProductMaster } from '@src/models/Product_Master';

/* eslint-disable @typescript-eslint/no-unused-vars */
export type ProductMasterDto = IProductMaster;

export type ProductStockDto = {
    quantity: number;
}; 

export type ProductMasterResponseDto = {
    result: string;
    message: string;
    statusCode: number;
    data: ProductMasterDto[];
}

export type NewProductMasterResponseDto = {
    result: string;
    message: string;
    statusCode: number;
    data: ProductMasterDto|null;
}

export type NewProductMasterRequestDto = {
    name: string;
    buying_price: number;
    selling_price: number;
    stock: ProductStockDto|null;
}