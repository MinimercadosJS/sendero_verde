import { setDeliveryPushToken } from "@/lib/mongo/metadata";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const token = await request.text()

    if (!token) {
        return NextResponse.json("Token not received", { status: 400 })
    }

    return await setDeliveryPushToken(token).then(token => NextResponse.json(token)).catch(error => NextResponse.json(error.message, { status: 500 }))
}