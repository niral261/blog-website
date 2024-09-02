import mongoose from "mongoose";

const Connection = (URL) => {
    try{
        mongoose.connect(URL);
        console.log('Database connected successfully');
    }catch(error){
        console.log('error while connecting with the database ', error);
    }
};

export default Connection; 
//mongodb+srv://najmera64725:7gSsctgVHkB79PMU@blog-app.m5zfyvi.mongodb.net/?retryWrites=true&w=majority&appName=blog-app
