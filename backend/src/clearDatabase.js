import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function clearDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear all collections
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    for (const collection of collections) {
      await db.collection(collection.name).deleteMany({});
      console.log(`🗑️  Cleared collection: ${collection.name}`);
    }

    console.log('✅ Database cleared!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

clearDatabase();
