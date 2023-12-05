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
	const result : ITxBuy = await prisma.tx_Buy.create({
		data:create, 
		include:{
			items:true,
		}});
	return result;
}

export default{
	GetAll,
	GetById,
	Create,
} as const;