/* eslint-disable max-len */
import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import ProductMasterService from "@src/services/ProductMasterService";
import Paths from "@src/constants/Paths";
import { Router } from "express";
import { IReq, IRes } from "./types/express/misc";
import { NewProductMasterRequestDto } from "@src/Dto/ProductMasterDto";
import Validator, { ValidationError } from "fastest-validator";
// import jetValidator from "jet-validator";

const router = Router(),
    v = new Validator();

router.get(Paths.ProductMaster.Get, async (_: IReq, res: IRes) => {
    const products = await ProductMasterService.GetAll();
    return res.status(HttpStatusCodes.OK).json(products);
});

router.get(Paths.ProductMaster.GetById, async (req: IReq, res: IRes) => {
    const { id } = req.params;
    const product = await ProductMasterService.GetById(id);
    return res.status(HttpStatusCodes.OK).json(product);
});

router.post(
    Paths.ProductMaster.Add,
    async (req: IReq<NewProductMasterRequestDto>, res: IRes) => {
        const schema = {
            name: { type: "string" },
            buying_price: { type: "number" },
            selling_price: { type: "number" },
            stock: {
                type: "object",
                props: {
                    quantity: "number",
                    satuan: "string",
                },
                optional: true,
            },
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
        // return res.json(validate);
        const product = req.body;
        const newProduct: NewProductMasterRequestDto = {
            name: product.name,
            buying_price: product.buying_price,
            selling_price: product.selling_price,
            stock: product.stock,
        };
        const result = await ProductMasterService.CreateNewProduct(newProduct);
        if (result.result === "Failed") {
            return res.status(HttpStatusCodes.CONFLICT).json(result);
        }
        return res.status(HttpStatusCodes.CREATED).json(result);
    }
);

router.put(
    Paths.ProductMaster.Update,
    async (req: IReq<NewProductMasterRequestDto>, res: IRes) => {
        const schema = {
            name: { type: "string" },
            buying_price: { type: "number" },
            selling_price: { type: "number" },
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
        const product = req.body;
        const newProduct: NewProductMasterRequestDto = {
            name: product.name,
            buying_price: product.buying_price,
            selling_price: product.selling_price,
            stock: product.stock,
        };
        const result = await ProductMasterService.UpdateProductById(
            newProduct,
            id
        );
        return res.status(HttpStatusCodes.OK).json(result);
    }
);

router.delete(Paths.ProductMaster.Delete, async (req: IReq, res: IRes) => {
    const { id } = req.params;
    const result = await ProductMasterService.DeleteById(id);
    return res.status(HttpStatusCodes.OK).json(result);
});

export default router;
