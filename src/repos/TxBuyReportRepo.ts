import { ITxBuy } from '@src/models/TxBuy';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function GetByMonth(date: Date) : Promise<ITxBuy[]> {
	const bulan = date.getMonth();
	const tahun = date.getFullYear();
	const tx : ITxBuy[] = await prisma.tx_Buy.findMany({
		where:{
			date:{
				lte: `${new Date(`${tahun}-${bulan}-31`).
					setUTCHours(23,59,59,999)}`,
				gte: `${new Date(`${tahun}-${bulan}-01`).
					setUTCHours(0,0,0,0)}`,
			},
		},
		include:{
			items: true,
		},
	});
	return tx;
}

async function GetByDate(startDate: Date, endDate : Date) : Promise<ITxBuy[]> {
	const start_date = new Date(startDate).setUTCHours(0,0,0,0);
	const start = new Date(start_date);
	const end_date = new Date(endDate).setUTCHours(23,59,59,999);
	const end = new Date(end_date);
	const tx : ITxBuy[] = await prisma.tx_Buy.findMany({
		where:{
			date:{
				lte: end.toDateString(),
				gte: start.toDateString(),
			},
		},
		include:{
			items: true,
		},
	});
	return tx;
}

export default {
	GetByMonth,
	GetByDate,
} as const;