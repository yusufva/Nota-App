/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-len */
import { IProductMaster } from "@src/models/Product_Master";
import { PrismaClient } from "@prisma/client";
import { Guid } from "guid-typescript";

const prisma = new PrismaClient();

async function GetAll(): Promise<IProductMaster[]> {
    const product: IProductMaster[] = await prisma.product_Master.findMany({
        include: { stock: true },
    });
    return product;
}

async function GetById(id: string): Promise<IProductMaster | null> {
    const product: IProductMaster | null =
        await prisma.product_Master.findUnique({
            where: { id: id },
            include: { stock: true },
        });
    return product;
}

async function Create(product: IProductMaster): Promise<IProductMaster | null> {
    const prismaProductData = {
        id: `${Guid.create().toString()}`,
        name: product.name.toLowerCase(),
        buying_price: product.buying_price,
        selling_price: product.selling_price,
        created_date: new Date(), // Set the created_date
        updated_date: new Date(), // Set the updated_date,
        stock: product.stock
            ? {
                  create: {
                      id: product.id,
                      quantity: product.stock.quantity,
                  },
              }
            : {
                  create: {
                      id: product.id,
                      quantity: 0,
                  },
              },
    };
    const create: IProductMaster = await prisma.product_Master.create({
        data: prismaProductData,
        include: { stock: true },
    });
    return create;
}

async function UpdateById(product: IProductMaster): Promise<IProductMaster> {
    const update: IProductMaster = await prisma.product_Master.update({
        where: { id: product.id },
        data: {
            name: product.name,
            buying_price: product.buying_price,
            selling_price: product.selling_price,
            updated_date: new Date(),
        },
        include: { stock: true },
    });
    return update;
}

async function Delete(id: string): Promise<boolean> {
    await prisma.product_Master.delete({ where: { id: id } });
    return true;
}

export default {
    GetAll,
    GetById,
    Create,
    UpdateById,
    Delete,
} as const;
