/* eslint-disable max-len */
import StockRepo from "@src/repos/StockRepo";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {
    NewStockRequestDto,
    NewStockResponseDto,
    StockResponseDto,
} from "@src/Dto/StockDto";
import { IStock } from "@src/models/Stock";

// **** Variables **** //

// **** Functions **** //

async function GetAll(): Promise<StockResponseDto> {
    const products = await StockRepo.GetAll();
    const response: StockResponseDto = {
        result: "Success",
        message: "Data Retrieve Successfully",
        statusCode: HttpStatusCodes.OK,
        data: products,
    };
    return response;
}

async function GetById(id: string): Promise<NewStockResponseDto> {
    const product = await StockRepo.GetById(id);
    const response: NewStockResponseDto = {
        result: "Success",
        message: "Data Retrieve Successfully",
        statusCode: HttpStatusCodes.OK,
        data: product,
    };
    return response;
}

async function UpdateStockById(
    product: NewStockRequestDto,
    id: string
): Promise<NewStockResponseDto> {
    let update = await StockRepo.GetById(id);
    if (!update) {
        return {
            result: "Failed",
            message: "Data Not Found",
            statusCode: HttpStatusCodes.NOT_FOUND,
            data: null,
        };
    }
    const updateStock: IStock = {
        id: id,
        quantity: product.quantity,
        satuan: product.satuan,
        created_date: update.created_date,
        updated_date: new Date(),
    };
    update = await StockRepo.UpdateById(updateStock);
    const response: NewStockResponseDto = {
        result: "Success",
        message: "Data Updated Successfully",
        statusCode: HttpStatusCodes.OK,
        data: update,
    };
    return response;
}

export default {
    GetAll,
    GetById,
    UpdateStockById,
} as const;
