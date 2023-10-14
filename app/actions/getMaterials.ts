import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getMaterials = async (search?: string, filter?: string) => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    console.log(search);
    const materials = await prisma.material.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        name: search ? {
          contains: search
        } : undefined,
      }
    //   where: {
    //     NOT: {
    //       email: session.user.email
    //     }
    //}
    });
    console.log(materials);
    return materials;
  } catch (error: any) {
    return [];
  }
};

export default getMaterials;
