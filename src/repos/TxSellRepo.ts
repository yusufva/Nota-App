import { ITxSell } from '@src/models/TxSell';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function GetAll(): Promise<ITxSell[]> {
	const tx: ITxSell[] = await prisma.tx_Sell.findMany({ 
		include: { 
			items: true,
		}, 
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
	const create = {
		id: '',
		date: tx.date,
		items: {
			createMany: {
				data: tx.items,
			},
		},
		final_price: tx.final_price,
		created_date: new Date(),
		updated_date: new Date(),
	};
	const res : ITxSell = await prisma.$transaction(
		async (txs): Promise<ITxSell> => {
			const sell: ITxSell = await txs.tx_Sell.create({
				data: create,
				include: {
					items: true,
				},
			});

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
			});
			return sell;
		},
	);
	return res;
}

export default{
	GetAll,
	GetById,
	Create,
} as const;