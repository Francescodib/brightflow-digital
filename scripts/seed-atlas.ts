/**
 * Script per popolare MongoDB Atlas con dati seed
 * Esegui: npm run seed:atlas
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';

// Carica variabili d'ambiente da .env.local
config({ path: resolve(process.cwd(), '.env.local') });

// Leggi MONGODB_URI dalle variabili d'ambiente
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI non trovata nelle variabili d\'ambiente');
  console.log('💡 Assicurati di avere .env.local con la connection string di MongoDB Atlas');
  process.exit(1);
}

const servicesData = [
  {
    title: 'Consulenza Digitale',
    description: 'Strategie digitali personalizzate per PMI',
    category: 'consulting',
    price: 1500,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Sviluppo Web',
    description: 'Siti web e applicazioni su misura',
    category: 'development',
    price: 3000,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Marketing Automation',
    description: 'Automazione processi marketing',
    category: 'marketing',
    price: 2000,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'SEO & Analytics',
    description: 'Ottimizzazione motori di ricerca e analisi dati',
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
    console.log('🔌 Connessione a MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connesso a MongoDB Atlas!');

    // Ottieni riferimenti alle collections
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database non disponibile');
    }

    // Pulisci le collections esistenti
    console.log('\n🧹 Pulizia collections esistenti...');
    await db.collection('services').deleteMany({});
    await db.collection('clients').deleteMany({});
    console.log('✅ Collections pulite');

    // Inserisci i servizi
    console.log('\n📊 Inserimento servizi...');
    const servicesResult = await db.collection('services').insertMany(servicesData);
    console.log(`✅ ${servicesResult.insertedCount} servizi inseriti`);

    // Inserisci i clienti
    console.log('\n👥 Inserimento clienti...');
    const clientsResult = await db.collection('clients').insertMany(clientsData);
    console.log(`✅ ${clientsResult.insertedCount} clienti inseriti`);

    // Verifica
    console.log('\n🔍 Verifica dati inseriti:');
    const servicesCount = await db.collection('services').countDocuments();
    const clientsCount = await db.collection('clients').countDocuments();
    console.log(`   📦 Services: ${servicesCount}`);
    console.log(`   👤 Clients: ${clientsCount}`);

    console.log('\n✨ Seed completato con successo!');
  } catch (error) {
    console.error('\n❌ Errore durante il seed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Connessione chiusa');
  }
}

seedDatabase();
