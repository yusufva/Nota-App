/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITxSell } from "@src/models/TxSell";
import { PrismaClient } from "@prisma/client";
import { Guid } from "guid-typescript";

const prisma = new PrismaClient();
type TransactionService = {
    tx_Sell: any;
    product_Stock: any;
};

async function GetAll(): Promise<ITxSell[]> {
    const tx: ITxSell[] = await prisma.tx_Sell.findMany({
        include: {
            items: true,
        },
        orderBy: {
            date: "desc",
        }
    });
    return tx;
}

async function GetById(id: string): Promise<ITxSell | null> {
    const tx: ITxSell | null = await prisma.tx_Sell.findUnique({
        where: { id: id },
        include: {
            items: true,
        },
    });
    return tx;
}

async function Create(tx: ITxSell): Promise<ITxSell | null> {
    for (const item of tx.items) {
        const product = await prisma.product_Stock.findUnique({
            where: {
                id: item.product_id,
            },
        });
        if (!product || product.quantity < item.quantity) {
            return null;
        }
    }

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
    const res: ITxSell = await prisma.$transaction(
        async (txs: TransactionService): Promise<ITxSell> => {
            const sell: ITxSell = await txs.tx_Sell.create({
                data: create,
                include: {
                    items: true,
                },
            });

            await Promise.all(
                tx.items.map(async (item) => {
                    let prod = await txs.product_Stock.findUnique({
                        where: { id: item.product_id },
                    });
                    if (!prod) {
                        return;
                    }
                    prod = await txs.product_Stock.update({
                        where: { id: prod.id },
                        data: {
                            quantity: prod.quantity - item.quantity,
                        },
                    });
                })
            );
            return sell;
        }
    );
    return res;
}

export default {
    GetAll,
    GetById,
    Create,
} as const;
