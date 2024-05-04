/* eslint-disable max-len */
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import StockService from "@src/services/StockService";
import Paths from "@src/constants/Paths";
import { Router } from "express";
import { IReq, IRes } from "./types/types";
import { NewStockRequestDto } from "@src/Dto/StockDto";
import Validator, { ValidationError } from "fastest-validator";

const router = Router(),
    v = new Validator();

router.get(Paths.Stock.Get, async (_: IReq, res: IRes) => {
    const stock = await StockService.GetAll();
    return res.status(HttpStatusCodes.OK).json(stock);
});

router.get(Paths.Stock.GetById, async (req: IReq, res: IRes) => {
    const { id } = req.params;
    const stock = await StockService.GetById(id);
    return res.status(HttpStatusCodes.OK).json(stock);
});

router.put(
    Paths.Stock.Update,
    async (req: IReq<NewStockRequestDto>, res: IRes) => {
        const schema = {
            quantity: { type: "number", optional: true },
            satuan: { type: "string" },
        };
        const validate = v.compile(schema);
        const validation = validate(req.body) as ValidationError[] | true;
        if (validation !== true) {
            const errors = validation.map((error: ValidationError) => ({
                message: error.message,
                field: error.field,
            }));
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                result: "Failed",
                message: "Validation Failed",
                statusCode: HttpStatusCodes.BAD_REQUEST,
                error: errors,
            });
        }
        const { id } = req.params;
        const stock = req.body;
        const updateStock: NewStockRequestDto = {
            quantity: stock.quantity,
            satuan: stock.satuan,
        };
        const result = await StockService.UpdateStockById(updateStock, id);
        return res.status(HttpStatusCodes.OK).json(result);
    }
);

export default router;
