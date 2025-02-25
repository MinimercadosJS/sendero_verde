import { getDeliveryPushTokens } from "@/lib/mongo/metadata";
import { DeliveryAddress } from "@/model/order";
import { toTitleCase } from "@/utils/functions";
import axios from "axios";

export async function sendNewOrderNotification(address: DeliveryAddress, orderId: string) {
    const { apartment, building, unit } = address

    try {
        const pushTokens = await getDeliveryPushTokens()

        for (const token of pushTokens) {
            await axios.post(`${process.env.EXPO_HOST_URL}`,
                {
                    "to": token,
                    "title": `Nuevo pedido a ${toTitleCase(unit)}`,
                    "body": `Apto ${apartment}  Torre ${building}`,
                    "data" : {
                        "order_id": orderId
                    }
                }
            )   
        }

    } catch (error: any) {
        console.log(error.message);
    }
}