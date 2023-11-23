import { NextRequest, NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { MaterialType } from '@prisma/client';
import { pusherServer } from '@/app/libs/pusher'


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
            type: filter as MaterialType ? {
                equals: filter as MaterialType,
            } : undefined
            ,
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
        type,
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
            type,
            user: {
                connect: { id: currentUser.id }
            },
        }
    });

    pusherServer.trigger('materials', 'new-material', newMaterial);
    
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

    pusherServer.trigger('materials', 'remove-material', deletedMaterial);
    
    return NextResponse.json(deletedMaterial, { status: 201 });
}

