import mongoose from "mongoose"


export const db = async () => {
    try {
      const connect = await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.kz8a2by.mongodb.net/Showroom`);
     console.log(
        `database has been connected successfully to ${JSON.stringify(
          connect.connection.host,
        )}`,
      );
    } catch (error) {
      console.error(`Mongodb connection error ${JSON.stringify(error)}`);
      process.exit(1);
    }

  };

