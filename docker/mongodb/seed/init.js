db = db.getSiblingDB('brightflow');

db.services.insertMany([
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

print('Database seeded successfully!');
print('Collections created:');
print('   - services: ' + db.services.countDocuments() + ' documents');
print('   - clients: ' + db.clients.countDocuments() + ' documents');
