import app from './index.js';
import { connectToMongoDB } from './src/config/config.mongoose.js';
 
app.listen(3400, () => {
    console.log("Server is listen at the port 3400");
    connectToMongoDB();
})