import { warn } from 'console';
import {MongoClient, ObjectId, ServerApiVersion} from 'mongodb'

const uri = ""

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const collection = client.db("sample_weatherdata").collection("data");

        // const res = await collection.findOne({_id: new ObjectId("5553a998e4b02cf7151190b8")});
        // console.log(res);

        // await collection.insertOne({ name: "Sander", age: 25 })
        // .then(async data => {
        //     await collection.findOne(data.insertedId).then(data => console.log(data));
        // });

        // await collection.updateOne({_id: new ObjectId("65d4805d8036f1b1ef2ad7df")}, {$set: { name: "Snadering", age: 22, nose: "HUGE" }})
        // .then((data) => console.log(data));
        //
        // const res = await collection.findOne({_id: new ObjectId("65d4805d8036f1b1ef2ad7df")});
        // console.log(res?._id.toString());

        await collection.find({"airTemperature.value": {$lt: 0}}).toArray().then(d => console.log(d));
    } catch (e) {
        console.error(e);
    }
}

run().then(() => console.log("DONE"));
