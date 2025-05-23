import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error('please define mongodb uri in env file');
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

export async function connectionDB() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opt = {
            bufferCommands: true,
            maxPoolSize: 10 
        };
        cached.promise = mongoose.connect(MONGODB_URI, opt).then(()=>{});
    }
}

try {
    cached.conn = await cached.promise;
} catch (error) {
    cached.promise = null;
    throw error;
}