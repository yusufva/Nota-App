/* eslint-disable max-len */
import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import ProductMasterService from "@src/services/ProductMasterService";
import Paths from "@src/constants/Paths";
import { Router } from "express";
import { IReq, IRes } from "./types/express/misc";
import { NewProductMasterRequestDto } from "@src/Dto/ProductMasterDto";
import jetValidator from "jet-validator";

const router = Router(),
    validate = jetValidator();

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
    validate("name", ["buying_price", "number"], ["selling_price", "number"]),
    async (req: IReq<NewProductMasterRequestDto>, res: IRes) => {
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
    validate(
        "name",
        ["buying_price", "number"],
        ["selling_price", "number"],
        ["stock", "number"],
        ["id", "string", "params"]
    ),
    async (req: IReq<NewProductMasterRequestDto>, res: IRes) => {
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

router.delete(
    Paths.ProductMaster.Delete,
    validate(["id", "string", "params"]),
    async (req: IReq, res: IRes) => {
        const { id } = req.params;
        const result = await ProductMasterService.DeleteById(id);
        return res.status(HttpStatusCodes.OK).json(result);
    }
);

export default router;
