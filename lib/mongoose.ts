import mongoose from 'mongoose';

let isConneted = false;

export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) return console.log('MONGODB_URL is required');
    if (isConneted) return console.log('already connected');

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected to MongoDB');
    } catch (err) {
        console.log(err);
    }


}