/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-len */
import { ISupplierMaster } from "@src/models/Supplier_Master";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function GetAll(): Promise<ISupplierMaster[]> {
    const result = await prisma.supplier_Master.findMany({
        include: {
            nota: {
                include: {
                    items: true,
                },
            },
        },
        orderBy: {
            nama: "asc",
        },
    });
    const supplier: ISupplierMaster[] = [];
    result.forEach((element) => {
        supplier.push({
            id: element.id,
            nama: element.nama,
            alamat: element.alamat,
            cp: element.cp,
            nota: element.nota,
            created_date: element.created_date,
            updated_date: element.updated_date,
        });
    });
    return supplier;
}

async function GetById(id: number): Promise<ISupplierMaster> {
    const result = await prisma.supplier_Master.findUnique({
        where: {
            id: id,
        },
        include: {
            nota: {
                include: {
                    items: true,
                },
            },
        },
    });
    const supplier: ISupplierMaster = {
        id: result?.id,
        nama: result?.nama,
        alamat: result?.alamat,
        cp: result?.cp,
        nota: result?.nota,
        created_date: result?.created_date,
        updated_date: result?.updated_date,
    };
    return supplier;
}

async function Create(supplier: ISupplierMaster): Promise<ISupplierMaster> {
    const create = {
        nama: supplier.nama,
        alamat: supplier.alamat,
        cp: supplier.cp,
        created_date: new Date(Date.now()),
        updated_date: new Date(Date.now()),
    };
    const result = await prisma.supplier_Master.create({
        data: create,
        include: {
            nota: {
                include: {
                    items: true,
                },
            },
        },
    });
    const supplierCreated: ISupplierMaster = {
        id: result.id,
        nama: result.nama,
        alamat: result.alamat,
        cp: result.cp,
        nota: result.nota,
        created_date: result.created_date,
        updated_date: result.updated_date,
    };
    return supplierCreated;
}

async function Update(
    id: number,
    supplier: ISupplierMaster
): Promise<ISupplierMaster> {
    const update = {
        nama: supplier.nama,
        alamat: supplier.alamat,
        cp: supplier.cp,
        updated_date: new Date(Date.now()),
    };
    const result = await prisma.supplier_Master.update({
        data: update,
        where: {
            id: id,
        },
        include: {
            nota: {
                include: {
                    items: true,
                },
            },
        },
    });
    const supplierUpdated: ISupplierMaster = {
        id: result?.id,
        nama: result?.nama,
        alamat: result?.alamat,
        cp: result.cp,
        nota: result.nota,
        created_date: result.created_date,
        updated_date: result.updated_date,
    };
    return supplierUpdated;
}

async function Delete(id: number): Promise<boolean> {
    try {
        await prisma.supplier_Master.delete({
            where: {
                id: id,
            },
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default {
    GetAll,
    GetById,
    Create,
    Update,
    Delete,
} as const;
