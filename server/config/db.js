import mongoose, { mongo } from 'mongoose';

// function to connect to the mongodb database

const connectDB = async ()=>{

    mongoose.connection.on('connected',()=>console.log('database connected'));

    await mongoose.connect(`${process.env.MONGODB_URI}/temporary`)
}

export default connectDB;