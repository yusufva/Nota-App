/* eslint-disable max-len */
import { IStock } from '@src/models/Stock';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function GetAll() : Promise<IStock[]> {
	const product :IStock[] = await prisma.product_Stock.findMany({include:{product:true}});
	return product;
}

async function GetById(id:string) : Promise<IStock | null>{
	const product : IStock | null = await prisma.product_Stock.findUnique({where:{id:id}, include:{product:true}});
	return product;
}

async function UpdateById(product:IStock) : Promise<IStock>{
	const update : IStock = await prisma.product_Stock.update({where:{id:product.id},data:{
		quantity: product.quantity,
		updated_date: new Date(),
	}, include:{product:true}});
	return update;
}

export default{
	GetAll,
	GetById,
	UpdateById,
} as const;