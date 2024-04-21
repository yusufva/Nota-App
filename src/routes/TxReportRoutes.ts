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
// import jetValidator from "jet-validator";
import Paths from "@src/constants/Paths";

const router = Router();
// validate = jetValidator();

router.post(
    Paths.report.TxBuy.Base + Paths.report.TxBuy.GetByDate,
    // validate(["startDate", "date"], ["endDate", "date"]),
    async (req: IReq<TxBuyRangeReportRequestDto>, res: IRes) => {
        const response = await TxReportService.GetTxBuyByDate(req.body);
        res.status(HttpStatusCodes.OK).json(response);
    }
);

router.post(
    Paths.report.TxBuy.Base + Paths.report.TxBuy.GetByMonth,
    // validate(["date", "date"]),
    async (req: IReq<TxBuyMonthReportRequestDto>, res: IRes) => {
        const response = await TxReportService.GetTxBuyByMonth(req.body);
        res.status(HttpStatusCodes.OK).json(response);
    }
);

router.post(
    Paths.report.TxSell.Base + Paths.report.TxSell.GetByDate,
    // validate(["startDate", "date"], ["endDate", "date"]),
    async (req: IReq<TxSellRangeReportRequestDto>, res: IRes) => {
        const response = await TxReportService.GetTxSellByDate(req.body);
        res.status(HttpStatusCodes.OK).json(response);
    }
);

router.post(
    Paths.report.TxSell.Base + Paths.report.TxSell.GetByMonth,
    // validate(["date", "date"]),
    async (req: IReq<TxSellMonthReportRequestDto>, res: IRes) => {
        const response = await TxReportService.GetTxSellByMonth(req.body);
        res.status(HttpStatusCodes.OK).json(response);
    }
);

export default router;
