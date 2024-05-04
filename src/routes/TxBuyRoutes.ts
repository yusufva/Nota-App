import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import TxBuyService from "@src/services/TxBuyService";
import Paths from "@src/constants/Paths";
import { Router } from "express";
import { IReq, IRes } from "./types/express/misc";
import { NewTxBuyRequestDto } from "@src/Dto/TxBuyDto";
import Validator, { ValidationError } from "fastest-validator";

const router = Router(),
    v = new Validator();

router.get(Paths.Stock.Get, async (_: IReq, res: IRes) => {
    const stock = await TxBuyService.GetAll();
    return res.status(HttpStatusCodes.OK).json(stock);
});

router.get(Paths.Stock.GetById, async (req: IReq, res: IRes) => {
    const { id } = req.params;
    const stock = await TxBuyService.GetById(id);
    return res.status(HttpStatusCodes.OK).json(stock);
});

router.post(
    Paths.TxBuy.Create,
    /* validate(['date'], ['final_price','number'], ['items','array']), */
    async (req: IReq<NewTxBuyRequestDto>, res: IRes) => {
        const schema = {
            date: { type: "string" },
            nota_id: { type: "string" },
            items: {
                type: "array",
                items: {
                    type: "object",
                    props: {
                        name: { type: "string" },
                        product_id: { type: "string" },
                        buying_price: { type: "number" },
                        quantity: { type: "number" },
                        total_price: { type: "number" },
                    },
                },
            },
            final_price: { type: "number" },
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
        const tx = req.body;
        const newTxBuy = await TxBuyService.Create(tx);
        return res.status(HttpStatusCodes.CREATED).json(newTxBuy);
    }
);

export default router;
