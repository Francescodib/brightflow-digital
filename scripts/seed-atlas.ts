/**
 * Script to populate MongoDB Atlas with seed data
 * Run: npm run seed:atlas
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

// Read MONGODB_URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI not found in environment variables');
  console.log('Make sure you have .env.local with MongoDB Atlas connection string');
  process.exit(1);
}

const servicesData = [
  {
    title: 'Digital Consulting',
    description: 'Customized digital strategies for SMEs',
    category: 'consulting',
    price: 1500,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Web Development',
    description: 'Custom websites and applications',
    category: 'development',
    price: 3000,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Marketing Automation',
    description: 'Marketing process automation',
    category: 'marketing',
    price: 2000,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'SEO & Analytics',
    description: 'Search engine optimization and data analysis',
    category: 'marketing',
    price: 1800,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const clientsData = [
  {
    name: 'TechStart Italia',
    email: 'contact@techstart.it',
    plan: 'premium',
    active: true,
    servicesUsed: ['development', 'consulting'],
    createdAt: new Date(),
  },
  {
    name: 'Digital Innovation Lab',
    email: 'info@digilab.com',
    plan: 'basic',
    active: true,
    servicesUsed: ['marketing'],
    createdAt: new Date(),
  },
  {
    name: 'Retail Solutions SRL',
    email: 'hello@retailsol.it',
    plan: 'premium',
    active: true,
    servicesUsed: ['development', 'marketing'],
    createdAt: new Date(),
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas!');

    // Get collections references
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database not available');
    }

    // Clean existing collections
    console.log('\nCleaning existing collections...');
    await db.collection('services').deleteMany({});
    await db.collection('clients').deleteMany({});
    console.log('Collections cleaned');

    // Insert services
    console.log('\nInserting services...');
    const servicesResult = await db.collection('services').insertMany(servicesData);
    console.log(`${servicesResult.insertedCount} services inserted`);

    // Insert clients
    console.log('\nInserting clients...');
    const clientsResult = await db.collection('clients').insertMany(clientsData);
    console.log(`${clientsResult.insertedCount} clients inserted`);

    // Verify
    console.log('\nVerifying inserted data:');
    const servicesCount = await db.collection('services').countDocuments();
    const clientsCount = await db.collection('clients').countDocuments();
    console.log(`   Services: ${servicesCount}`);
    console.log(`   Clients: ${clientsCount}`);

    console.log('\nSeed completed successfully!');
  } catch (error) {
    console.error('\nError during seed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\nConnection closed');
  }
}

seedDatabase();
