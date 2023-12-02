import ProductMasterRepo from '@src/repos/ProductMasterRepo';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
// eslint-disable-next-line max-len
import { NewProductMasterRequestDto, NewProductMasterResponseDto, ProductMasterResponseDto } from '@src/Dto/ProductMasterDto';
import { IProductMaster } from '@src/models/Product_Master';

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';

async function GetAll(): Promise<ProductMasterResponseDto> {
	const products = await ProductMasterRepo.GetAll();
	const response : ProductMasterResponseDto = {
		result: 'Success',
		message: 'Data Retrieve Successfully',
		statusCode: HttpStatusCodes.OK,
		data: products,
	};
	return response;
}

async function GetById(id:string):Promise<NewProductMasterResponseDto> {
	const product = await ProductMasterRepo.GetById(id);
	const response:NewProductMasterResponseDto = {
		result: 'Success',
		message: 'Data Retrieve Successfully',
		statusCode: HttpStatusCodes.OK,
		data: product,
	};
	return response;
}

// eslint-disable-next-line max-len
async function CreateNewProduct(product:NewProductMasterRequestDto):Promise<NewProductMasterResponseDto> {
	const newProduct:IProductMaster = {
		id: undefined,
		name: product.name,
		buying_price: product.buying_price,
		selling_price: product.selling_price,
		stock: product.stock ? {
			id: undefined,
			quantity: product.stock?.quantity,
			created_date: new Date(),
			updated_date: new Date(),
		} : {
			id: undefined,
			quantity: 0,
			created_date: new Date(),
			updated_date: new Date(),
		},
		created_date: new Date(),
		updated_date: new Date(),
	};
	const create = await ProductMasterRepo.Create(newProduct);
	const response:NewProductMasterResponseDto = {
		result: 'Success',
		message: 'Data Created Successfully',
		statusCode: HttpStatusCodes.OK,
		data: create,
	};
	return response;
}

// eslint-disable-next-line max-len
async function UpdateProductById(product:NewProductMasterRequestDto, id:string):Promise<NewProductMasterResponseDto> {
	let update = await ProductMasterRepo.GetById(id);
	if (!update) {
		return {
			result: 'Failed',
			message: 'Data Not Found',
			statusCode: HttpStatusCodes.NOT_FOUND,
			data: null,
		};
	}
	const updateProduct:IProductMaster = {
		id: id,
		name: product.name,
		buying_price: product.buying_price,
		selling_price: product.selling_price,
		stock: product.stock ? {
			id: undefined,
			quantity: product.stock?.quantity,
			created_date: new Date(),
			updated_date: new Date(),
		} : {
			id: undefined,
			quantity: 0,
			created_date: new Date(),
			updated_date: new Date(),
		},
		created_date: update?.created_date,
		updated_date: new Date(),
	};
	update = await ProductMasterRepo.UpdateById(updateProduct);
	const response:NewProductMasterResponseDto = {
		result: 'Success',
		message: 'Data Updated Successfully',
		statusCode: HttpStatusCodes.OK,
		data: update,
	};
	return response;
}

async function DeleteById(id:string):Promise<NewProductMasterResponseDto>{
	const product = await ProductMasterRepo.GetById(id);
	if(!product){
		return {
			result: 'Failed',
			message: 'Data Not Found',
			statusCode: HttpStatusCodes.NOT_FOUND,
			data: null,
		};
	}
	await ProductMasterRepo.Delete(id);

	const response:NewProductMasterResponseDto = {
		result: 'Success',
		message: 'Data Deleted Successfully',
		statusCode: HttpStatusCodes.OK,
		data: product,
	};
	return response;
}

export default {
	GetAll,
	GetById,
	CreateNewProduct,
	UpdateProductById,
	DeleteById,
} as const;