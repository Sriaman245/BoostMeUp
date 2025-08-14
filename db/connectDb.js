import mongoose from "mongoose";
// i have taken this code from topcoder(mongoose connect mongodb)
const connectDb = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  export default connectDb;
