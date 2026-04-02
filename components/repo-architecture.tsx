'use client';

import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

interface Service {
  name: string;
  description: string;
}

interface Controller {
  name: string;
  services: string[];
  endpoints: Endpoint[];
}

interface Endpoint {
  method: string;
  path: string;
  description: string;
}

interface RepositoryArchitecture {
  name: string;
  description: string;
  services: Service[];
  controllers: Controller[];
  database?: string;
}

export function RepoArchitecture({ repo }: { repo: RepositoryArchitecture }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">{repo.name}</h2>
        <p className="text-gray-700 dark:text-gray-300">{repo.description}</p>
        {repo.database && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            <strong>Primary Database:</strong> {repo.database}
          </p>
        )}
      </div>

      <Tabs items={['Services', 'Controllers', 'API Endpoints', 'Architecture']}>
        <Tab value="Services">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Services provide business logic and data operations for this repository.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repo.services.map((service) => (
                <div
                  key={service.name}
                  className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4"
                >
                  <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Tab>

        <Tab value="Controllers">
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400">
              Controllers handle HTTP requests and orchestrate services.
            </p>
            {repo.controllers.map((controller) => (
              <div
                key={controller.name}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6"
              >
                <div className="mb-4">
                  <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400 mb-2">
                    {controller.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {controller.services.map((service) => (
                      <span
                        key={service}
                        className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs px-3 py-1 rounded-full"
                      >
                        Uses: {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-900 rounded p-4">
                  <p className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400">
                    Endpoints:
                  </p>
                  <div className="space-y-2">
                    {controller.endpoints.map((endpoint, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className={`px-2 py-1 rounded font-mono text-xs font-bold ${
                          endpoint.method === 'GET' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300' :
                          endpoint.method === 'POST' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' :
                          endpoint.method === 'PUT' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300' :
                          endpoint.method === 'DELETE' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300' :
                          'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                        }`}>
                          {endpoint.method}
                        </span>
                        <div>
                          <p className="font-mono text-gray-700 dark:text-gray-300">
                            {endpoint.path}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {endpoint.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tab>

        <Tab value="API Endpoints">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Complete list of API endpoints available in this repository.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                    <th className="text-left py-3 px-4 font-semibold">Method</th>
                    <th className="text-left py-3 px-4 font-semibold">Endpoint</th>
                    <th className="text-left py-3 px-4 font-semibold">Controller</th>
                    <th className="text-left py-3 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {repo.controllers.flatMap((controller) =>
                    controller.endpoints.map((endpoint, idx) => (
                      <tr
                        key={`${controller.name}-${idx}`}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-900 transition"
                      >
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded font-mono text-xs font-bold ${
                            endpoint.method === 'GET' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300' :
                            endpoint.method === 'POST' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' :
                            endpoint.method === 'PUT' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300' :
                            endpoint.method === 'DELETE' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300' :
                            'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                          }`}>
                            {endpoint.method}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-gray-700 dark:text-gray-300">
                          {endpoint.path}
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {controller.name}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {endpoint.description}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Tab>

        <Tab value="Architecture">
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400">
              Visual representation of the service architecture and data flow.
            </p>

            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-semibold mb-4 text-lg">Service Layer</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {repo.services.map((service) => (
                  <div
                    key={service.name}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3"
                  >
                    <p className="font-mono text-sm text-green-700 dark:text-green-400">
                      {service.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center my-4 text-gray-400 dark:text-gray-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              <h3 className="font-semibold mb-4 text-lg">Controller Layer</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {repo.controllers.map((controller) => (
                  <div
                    key={controller.name}
                    className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3"
                  >
                    <p className="font-mono text-sm text-blue-700 dark:text-blue-400">
                      {controller.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center my-4 text-gray-400 dark:text-gray-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {repo.database && (
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-4">
                  <p className="font-mono text-sm text-orange-700 dark:text-orange-400">
                    🗄️ {repo.database}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
