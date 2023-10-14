import { NextRequest, NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET(request: NextRequest) {
    //Get query params
    const url = new URL(request.url || '');
    const search = url.searchParams.get('search') == 'null' ? undefined : url.searchParams.get('search');
    const filter = url.searchParams.get('filter') == 'null' ? undefined : url.searchParams.get('filter');

    const materials = await prisma.material.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: true,
        },
        where: {
            name: search ? {
                contains: search,
                mode: 'insensitive',
            } : undefined,
        }
    });
    
    return NextResponse.json(materials);
}

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
        name,
        description,
        image,
        price,
    } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const newMaterial = await prisma.material.create({
        include: {
            user: true,
        },
        data: {
            name,
            description,
            image,
            price,
            user: {
                connect: { id: currentUser.id }
            },
        }
    });
    
    return NextResponse.json(newMaterial, { status: 201 });
}

export async function DELETE(
    request: Request,
) {
    //Get id from headers
    const headers = new Headers(request.headers);
    const id = headers.get('delete-id') || '';

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }   
    
    const deletedMaterial = await prisma.material.delete({
        where: {
            id,
        }
    });
    
    return NextResponse.json(deletedMaterial, { status: 201 });
}

