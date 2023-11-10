import { IProductMaster } from '@src/models/Product_Master';

/* eslint-disable @typescript-eslint/no-unused-vars */
export type ProductMasterDto = IProductMaster;

export type ProductStockDto = {
    id: string;
    quantity: number;
    created_date: Date;
    updated_date: Date;
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