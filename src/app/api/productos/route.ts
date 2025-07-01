import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";


export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const componente = searchParams.get('componente');
    const nombre = searchParams.get('nombre');
    const orden = searchParams.get('orden') || 'id';
    const id = searchParams.get('id');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;
    
    const prismaModeloMap: Record<string, {
          findMany: Function;
          count: Function;
        }> = {
        graficas: prisma.graficas,
        fuentes: prisma.fuentes,
        cpus: prisma.cpus,
        rams: prisma.rams,
        mothers: prisma.mothers,
        coolers: prisma.coolers,
        gabinetes: prisma.gabinetes,
        memorias_externas: prisma.memorias_externas,
        memorias_internas: prisma.memorias_internas,
        sounds: prisma.sounds
        } as const;

      if (nombre && !componente) {
        try {
          const resultados = await Promise.all(
            Object.entries(prismaModeloMap).map(async ([tipo, modelo]) => {
              const items = await modelo.findMany({
                where: {
                  name: {
                    contains: nombre,
                    mode: 'insensitive',
                  },
                },
              });
              return items.map((item: any) => ({ ...item, tipo }));
            })
          );

          const productos = resultados.flat();

          // Ordenar
          productos.sort((a, b) => {
            if (orden === 'precio_asc') return a.price - b.price;
            if (orden === 'precio_desc') return b.price - a.price;
            return a.id - b.id;
          });

          const paginados = productos.slice(skip, skip + limit);

          return NextResponse.json({
            productos: paginados,
            total: productos.length,
            page,
            pages: Math.ceil(productos.length / limit),
          });
        } catch (error) {
          return NextResponse.json({ error: 'Error en búsqueda global' }, { status: 500 });
        }
      }
      if (id && componente && componente in prismaModeloMap && searchParams.get('relacionados') === 'true') {
        const modelo = prismaModeloMap[componente];

        try {
          const recomendados = await modelo.findMany({
            where: {
              NOT: { id: Number(id) }
            },
            take: 10,
          });

          return NextResponse.json(recomendados);
        } catch (error) {
          return NextResponse.json({ error: 'Error al buscar productos relacionados' }, { status: 500 });
        }
      }


      if (id && componente && componente in prismaModeloMap){
        const modelo = prismaModeloMap[componente];
        try {
            const productos = await modelo.findMany({
                where: { id: Number(id) },
            });

            const producto = productos[0];

            if (!producto) {
                return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
            }

            return NextResponse.json(producto);
        } catch (error) {
            return NextResponse.json({ error: 'Error al buscar producto' }, { status: 500 });
        }
      }

      if (componente && componente in prismaModeloMap) {
        const modelo = prismaModeloMap[componente];

        const where: any = {};

        if (nombre) {
          where.name = {
            contains: nombre,
            mode: 'insensitive',
          };
        }

        let orderBy: any = {};
        if (orden === 'precio_asc') orderBy = { price: 'asc' };
        else if (orden === 'precio_desc') orderBy = { price: 'desc' };
        else orderBy = { id: 'asc' };

        try {
          const productos = await modelo.findMany({
            where,
            orderBy,
            skip,
            take: limit,
          });

          const total = await modelo.count({ where });

          return NextResponse.json({
            productos,
            total,
            page,
            pages: Math.ceil(total / limit),
          });
        } catch (error) {
          return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
        }
      }


    
    return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 });

    /*
    if (!componente || !(componente in prismaModeloMap)) {
    return NextResponse.json({ error: 'Categoría inválida' }, { status: 400 });
    }
    

    const modelo = prismaModeloMap[componente : 'graficas'];

    

    const where: any = {};
    if (nombre) {
        where.name = {
        contains: nombre,
        mode: 'insensitive',
        };
    }


    let orderBy: any = {};
    if (orden === 'precio_asc') orderBy = { price: 'asc' };
    else if (orden === 'precio_desc') orderBy = { price: 'desc' };
    else orderBy = { id: 'asc' }; // default

    try {
        const productos = await modelo.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        });

        const total = await modelo.count({ where });

        return NextResponse.json({
        productos,
        total,
        page,
        pages: Math.ceil(total / limit),
        });
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
    }

    if (nombre) {
    try {
      const resultados = await Promise.all(
        Object.entries(prismaModeloMap).map(async ([tipo, modelo]) => {
          const items = await modelo.findMany({
            where: {
              name: {
                contains: nombre,
                mode: 'insensitive',
              },
            },
          });

          return items.map((item: any) => ({
            ...item,
            tipo, // 🏷️ agregamos de qué tabla viene
          }));
        })
      );

      const productos = resultados.flat();

      // 🔢 Paginación manual sobre todos los resultados
      const total = productos.length;
      const paginados = productos
        .sort((a, b) => {
          if (orden === 'precio_asc') return a.price - b.price;
          if (orden === 'precio_desc') return b.price - a.price;
          return a.id - b.id;
        })
        .slice(skip, skip + limit);

      return NextResponse.json({
        productos: paginados,
        total,
        page,
        pages: Math.ceil(total / limit),
      });
    } catch (error) {
      return NextResponse.json({ error: 'Error en búsqueda global' }, { status: 500 });
    }
  }
    */
}
