import { ITxBuy } from '@src/models/TxBuy';
import { PrismaClient } from '@prisma/client';
// import { Guid } from 'guid-typescript';

const prisma = new PrismaClient();

async function GetAll() : Promise<ITxBuy[]>{
	const tx : ITxBuy[] = await prisma.tx_Buy.findMany({include:{items:true}});
	return tx;
}

async function GetById(id:string) : Promise<ITxBuy | null>{
	const tx : ITxBuy | null = await prisma.tx_Buy.findUnique({
		where:{id:id}, 
		include:{
			items:true,
		}});
	return tx;
}

async function Create(tx:ITxBuy) : Promise<ITxBuy | null>{
	const create = {
		id: '',
		date: tx.date,
		final_price: tx.final_price,
		created_date: new Date(),
		updated_date: new Date(),
		items: {
			createMany: {
				data: tx.items,
			},
		},
	};
	const res:ITxBuy = await prisma.$transaction(
		async (txs): Promise<ITxBuy> => {
			const buy : ITxBuy = await txs.tx_Buy.create({
				data: create,
				include:{
					items:true,
				},
			});

			tx.items.map(async (item)=>{
				const prod = await txs.product_Stock.findUnique({
					where:{id:item.product_id},
				});
				if(!prod){
					return;
				}
				await txs.product_Stock.update({
					where:{id:prod.id},
					data:{
						quantity: prod.quantity + item.quantity,
					},
				});
			});

			return buy;
		},
	);
	/* const result : ITxBuy = await prisma.tx_Buy.create({
		data:create, 
		include:{
			items:true,
		}}); */
	return res;
}

export default{
	GetAll,
	GetById,
	Create,
} as const;