import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import type { IService } from '@/types';

export const revalidate = 3600; // Revalidate ogni ora

async function getServices(): Promise<IService[]> {
  try {
    await connectDB();
    const services = await Service.find({ active: true }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(services));
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export default async function Home() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">BrightFlow Digital</h1>
            <nav className="hidden space-x-6 md:flex">
              <a href="#services" className="text-gray-600 hover:text-blue-600">
                Servizi
              </a>
              <a href="/api/services" className="text-gray-600 hover:text-blue-600">
                API
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Servizi Digitali
            <span className="block text-blue-600">per il Tuo Successo</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Consulenza e sviluppo digitale personalizzati per piccole e medie imprese.
            Trasformiamo le tue idee in soluzioni scalabili e performanti .
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#services"
              className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Scopri i Servizi
            </a>
            <a
              href="/api/services"
              className="rounded-full border border-gray-300 bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
            >
              API Demo
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">I Nostri Servizi</h2>
          <p className="mt-4 text-lg text-gray-600">
            Soluzioni complete per la tua trasformazione digitale
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.length > 0 ? (
            services.map((service) => (
              <div
                key={service._id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-blue-100 opacity-50 transition-transform group-hover:scale-150" />

                <div className="relative">
                  <div className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                    {service.category}
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mb-4 text-gray-600">{service.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      €{service.price.toLocaleString('it-IT')}
                    </span>
                    <span className="text-sm text-gray-500">a partire da</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Nessun servizio disponibile al momento
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{services.length}+</div>
              <div className="mt-2 text-sm text-gray-600">Servizi Attivi</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">99.9%</div>
              <div className="mt-2 text-sm text-gray-600">Uptime Garantito</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">&lt;50ms</div>
              <div className="mt-2 text-sm text-gray-600">Edge Latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600">
              © 2026 BrightFlow Digital - Francesco di Biase
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <span>Deploy su Vercel Edge Network</span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Operativo
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
