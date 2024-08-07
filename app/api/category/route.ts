import { NextRequest, NextResponse } from "next/server";

import { createCategory, getAllCategories } from "@/lib/category/category.service";

export async function POST(request: NextRequest) {
    const { name } = await request.json();

    if (!name) {
        return NextResponse.json(
            {
                error: "Nome da categoria é obrigatório."
            },
            {
                status: 400
            }
        )
    }

    const category = await createCategory({ name });

    return NextResponse.json(
        {
            category: category.id
        },
        {
            status: 201
        }
    )
}

export async function GET() {
    const categories = await getAllCategories();

    return NextResponse.json(
        {
            categories: categories.map(category => {
                return {
                    id: category.id,
                    name: category.name,
                }
            })
        },
        {
            status: 201
        }
    )
}
