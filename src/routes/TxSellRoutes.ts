import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import TxSellService from "@src/services/TxSellService";
import Paths from "@src/constants/Paths";
import { Router } from "express";
import { IReq, IRes } from "./types/express/misc";
import { NewTxSellRequestDto } from "@src/Dto/TxSellDto";
import Validator, { ValidationError } from "fastest-validator";
// import jetValidator from 'jet-validator';

const router = Router(),
    v = new Validator();

router.get(Paths.TxSell.Get, async (_: IReq, res: IRes) => {
    const response = await TxSellService.GetAll();
    res.status(HttpStatusCodes.OK).json(response);
});

router.get(
    Paths.TxSell.Get + ":id",
    async (req: IReq<{ id: string }>, res: IRes) => {
        const response = await TxSellService.GetById(req.params.id);
        res.status(HttpStatusCodes.OK).json(response);
    }
);

router.post(
    Paths.TxSell.Create,
    async (req: IReq<NewTxSellRequestDto>, res: IRes) => {
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
        const response = await TxSellService.Create(req.body);
        res.status(HttpStatusCodes.CREATED).json(response);
    }
);

export default router;
