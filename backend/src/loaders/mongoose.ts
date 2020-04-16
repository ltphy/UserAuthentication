import mongoose from 'mongoose';
import mongodb from 'mongodb';

export default async (): Promise<mongodb.DB> => {
    if (!process.env.DB_URL) {
        throw Error('No database url found');
    }
    const connection = await mongoose.connect(process.env.DB_URL, {useNewParser: true});
    return connection.connection.db;
}