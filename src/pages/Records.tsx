import React from 'react';
import { FileText, Search, Filter, Download, Upload, Clock, Tag, Folder } from 'lucide-react';
import { RegistroMedico } from '../types';

interface RecordsProps {
  records: RegistroMedico[];
}

export default function Records({ records }: RecordsProps) {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Registros Médicos</h1>
            <p className="text-secondary-600">Accede y gestiona los registros médicos de pacientes</p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-secondary-600 hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              <span>Subir</span>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-secondary-600 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Registros', value: '1.234', icon: FileText, trend: '+28 este mes' },
            { label: 'Subidas Recientes', value: '48', icon: Upload, trend: 'Últimos 7 días' },
            { label: 'Pendientes de Revisión', value: '12', icon: Clock, trend: 'Requieren atención' },
            { label: 'Categorías', value: '8', icon: Tag, trend: 'Categorías activas' }
          ].map(({ label, value, icon: Icon, trend }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <span className="text-secondary-600">{label}</span>
              </div>
              <p className="text-2xl font-semibold text-secondary-900">{value}</p>
              <p className="text-sm text-secondary-500 mt-1">{trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Barra lateral de Categorías */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h2 className="font-semibold text-secondary-900 mb-4">Categorías</h2>
              <div className="space-y-2">
                {[
                  { name: 'Informes de Laboratorio', count: 156 },
                  { name: 'Notas Clínicas', count: 89 },
                  { name: 'Radiología', count: 64 },
                  { name: 'Prescripciones', count: 212 },
                  { name: 'Registros de Cirugía', count: 45 },
                  { name: 'Resúmenes de Alta', count: 78 }
                ].map(category => (
                  <button
                    key={category.name}
                    className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-secondary-400" />
                      <span className="text-secondary-900">{category.name}</span>
                    </div>
                    <span className="text-sm text-secondary-500">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lista de Registros */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative flex-1 w-full">
                    <input
                      type="text"
                      placeholder="Buscar registros..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <select className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-auto">
                    <option value="all">Todos los Tipos</option>
                    <option value="lab">Informes de Laboratorio</option>
                    <option value="clinical">Notas Clínicas</option>
                    <option value="radiology">Radiología</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {records.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-secondary-400" />
                            <div>
                              <div className="text-sm font-medium text-secondary-900">{record.titulo}</div>
                              <div className="text-sm text-secondary-500">{record.departamento}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary-900">{record.paciente}</td>
                        <td className="px-6 py-4 text-sm text-secondary-900">{record.tipo}</td>
                        <td className="px-6 py-4 text-sm text-secondary-900">{record.fecha}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            record.estado === 'Final'
                              ? 'bg-green-50 text-green-700 border border-green-100'
                              : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            {record.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}