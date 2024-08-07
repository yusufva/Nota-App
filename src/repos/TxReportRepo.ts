import { ITxBuy } from "@src/models/TxBuy";
import { ITxSell } from "@src/models/TxSell";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function GetTxBuyByMonth(date: Date): Promise<ITxBuy[]> {
    const bulan = date.getMonth();
    const tahun = date.getFullYear();
    const end = new Date(
        new Date(`${tahun}-${bulan}-31`).setUTCHours(23, 59, 59, 999)
    );
    const start = new Date(
        new Date(`${tahun}-${bulan}-01`).setUTCHours(0, 0, 0, 0)
    );
    const tx: ITxBuy[] = await prisma.tx_Buy.findMany({
        where: {
            date: {
                lte: end.toISOString(),
                gte: start.toISOString(),
            },
        },
        include: {
            items: true,
        },
        orderBy: {
            date: "desc",
        },
    });
    return tx;
}

async function GetTxBuyByDate(
    startDate: Date,
    endDate: Date
): Promise<ITxBuy[]> {
    const start_date = new Date(startDate).setUTCHours(0, 0, 0, 0);
    const start = new Date(start_date);
    const end_date = new Date(endDate).setUTCHours(23, 59, 59, 999);
    const end = new Date(end_date);
    const tx: ITxBuy[] = await prisma.tx_Buy.findMany({
        where: {
            date: {
                lte: end.toISOString(),
                gte: start.toISOString(),
            },
        },
        include: {
            items: true,
        },
        orderBy: {
            date: "desc",
        },
    });
    return tx;
}

async function GetTxSellByMonth(date: Date): Promise<ITxSell[]> {
    const bulan = date.getMonth();
    const tahun = date.getFullYear();
    const end = new Date(
        new Date(`${tahun}-${bulan}-31`).setUTCHours(23, 59, 59, 999)
    );
    const start = new Date(
        new Date(`${tahun}-${bulan}-01`).setUTCHours(0, 0, 0, 0)
    );
    const tx: ITxSell[] = await prisma.tx_Sell.findMany({
        where: {
            date: {
                lte: end.toISOString(),
                gte: start.toISOString(),
            },
        },
        include: {
            items: true,
        },
        orderBy: {
            date: "desc",
        },
    });
    return tx;
}

async function GetTxSellByDate(
    startDate: Date,
    endDate: Date
): Promise<ITxSell[]> {
    const start_date = new Date(startDate).setUTCHours(0, 0, 0, 0);
    const start = new Date(start_date);
    const end_date = new Date(endDate).setUTCHours(23, 59, 59, 999);
    const end = new Date(end_date);
    const tx: ITxSell[] = await prisma.tx_Sell.findMany({
        where: {
            date: {
                lte: end.toISOString(),
                gte: start.toISOString(),
            },
        },
        include: {
            items: true,
        },
        orderBy: {
            date: "desc",
        },
    });
    return tx;
}

export default {
    GetTxBuyByDate,
    GetTxBuyByMonth,
    GetTxSellByDate,
    GetTxSellByMonth,
} as const;
