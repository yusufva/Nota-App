/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITxBuy } from "@src/models/TxBuy";
import { PrismaClient } from "@prisma/client";
import { Guid } from "guid-typescript";

const prisma = new PrismaClient();
type TransactionService = {
    tx_Buy: any;
    product_Stock: any;
    product_Master: any;
};

async function GetAll(): Promise<ITxBuy[]> {
    const tx: ITxBuy[] = await prisma.tx_Buy.findMany({
        include: { items: true },
        orderBy: {
            date: "desc",
        }
    });
    return tx;
}

async function GetById(id: string): Promise<ITxBuy | null> {
    const tx: ITxBuy | null = await prisma.tx_Buy.findUnique({
        where: { id: id },
        include: {
            items: true,
        },
    });
    return tx;
}

async function Create(tx: ITxBuy): Promise<ITxBuy | null> {
    const create = {
        id: `${Guid.create().toString()}`,
        date: tx.date,
        nota_id: tx.nota_id,
        final_price: tx.final_price,
        created_date: new Date(),
        items: {
            createMany: {
                data: tx.items,
            },
        },
    };
    const res: ITxBuy = await prisma.$transaction(
        async (txs: TransactionService): Promise<ITxBuy> => {
            const buy: ITxBuy = await txs.tx_Buy.create({
                data: create,
                include: {
                    items: true,
                },
            });

            await Promise.all(
                tx.items.map(async (item) => {
                    const prod = await txs.product_Stock.findUnique({
                        where: { id: item.product_id },
                    });
                    if (!prod) {
                        return;
                    }
                    await txs.product_Stock.update({
                        where: { id: prod.id },
                        data: {
                            quantity: prod.quantity + item.quantity,
                        },
                    });
                    await txs.product_Master.update({
                        where: {
                            id: prod.id,
                        },
                        data: {
                            buying_price: item.buying_price,
                            updated_date: new Date(Date.now()),
                        },
                    });
                })
            );

            return buy;
        }
    );
    /* const result : ITxBuy = await prisma.tx_Buy.create({
		data:create, 
		include:{
			items:true,
		}}); */
    return res;
}

export default {
    GetAll,
    GetById,
    Create,
} as const;
