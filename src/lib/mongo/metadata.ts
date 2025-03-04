import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from ".";
import { TenantMetadata } from "@/model/metadata";

let client: MongoClient;
let db: Db;
let metadata: Collection<TenantMetadata>;

export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db(process.env.TENANT_ID)
        metadata = db.collection('metadata')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}
;
(async () => {
    await init()
})

async function getDeliveryPushTokens() {
    await init()
    try {
        const result = await metadata.findOne({}, { projection: { delivery: 1 } });
        if (result && result.delivery.pushTokens) {
            return result.delivery.pushTokens;
        }
        return [];

    } catch (error: any) {
        throw new Error(error.message)
    }
}

async function setDeliveryPushToken(token: string) {
    await init()
    return await metadata.updateOne({}, { $addToSet: { "delivery.pushTokens": token } })
}

export { getDeliveryPushTokens, setDeliveryPushToken }