db = db.getSiblingDB('brightflow');

db.services.insertMany([
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
]);

db.clients.insertMany([
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
]);

print('✅ Database seeded successfully!');
print('📊 Collections created:');
print('   - services: ' + db.services.countDocuments() + ' documents');
print('   - clients: ' + db.clients.countDocuments() + ' documents');
