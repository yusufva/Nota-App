import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import TxReportService from "@src/services/TxReportService";
import { Router } from "express";
import { IReq, IRes } from "./types/express/misc";
import {
    TxBuyMonthReportRequestDto,
    TxBuyRangeReportRequestDto,
} from "@src/Dto/TxBuyDto";
import {
    TxSellMonthReportRequestDto,
    TxSellRangeReportRequestDto,
} from "@src/Dto/TxSellDto";
import Paths from "@src/constants/Paths";
import Validator, { ValidationError } from "fastest-validator";

const router = Router(),
    v = new Validator();

router.post(
    Paths.report.TxBuy.Base + Paths.report.TxBuy.GetByDate,
    async (req: IReq<TxBuyRangeReportRequestDto>, res: IRes) => {
        const schema = {
            startDate: { type: "string" },
            endDate: { type: "string" },
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
        const response = await TxReportService.GetTxBuyByDate(req.body);
        res.status(HttpStatusCodes.OK).json(response);
    }
);

router.post(
    Paths.report.TxBuy.Base + Paths.report.TxBuy.GetByMonth,
    async (req: IReq<TxBuyMonthReportRequestDto>, res: IRes) => {
        const schema = {
            startDate: { type: "string" },
            endDate: { type: "string" },
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
        const response = await TxReportService.GetTxBuyByMonth(req.body);
        res.status(HttpStatusCodes.OK).json(response);
    }
);

router.post(
    Paths.report.TxSell.Base + Paths.report.TxSell.GetByDate,
    async (req: IReq<TxSellRangeReportRequestDto>, res: IRes) => {
        const schema = {
            startDate: { type: "string" },
            endDate: { type: "string" },
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
        const response = await TxReportService.GetTxSellByDate(req.body);
        res.status(HttpStatusCodes.OK).json(response);
    }
);

router.post(
    Paths.report.TxSell.Base + Paths.report.TxSell.GetByMonth,
    async (req: IReq<TxSellMonthReportRequestDto>, res: IRes) => {
        const schema = {
            startDate: { type: "string" },
            endDate: { type: "string" },
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
        const response = await TxReportService.GetTxSellByMonth(req.body);
        res.status(HttpStatusCodes.OK).json(response);
    }
);

export default router;
