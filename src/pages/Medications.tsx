import React from 'react';
import { Pill, Search, Filter, Plus, AlertCircle, Clock, RefreshCcw } from 'lucide-react';
import { Medicamento } from '../types';

interface MedicationsProps {
  medications: Medicamento[];
}

export default function Medications({ medications }: MedicationsProps) {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Medicamentos</h1>
            <p className="text-secondary-600">Gestiona prescripciones y medicamentos de pacientes</p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-secondary-600 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtrar</span>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              <Plus className="w-4 h-4" />
              <span>Nueva Prescripción</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Prescripciones Activas', value: '156', icon: Pill, trend: '+3 esta semana' },
            { label: 'Recargas Pendientes', value: '28', icon: RefreshCcw, trend: '12 para esta semana' },
            { label: 'Próximos a Expirar', value: '15', icon: AlertCircle, trend: 'Próximos 30 días' }
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

        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Buscar medicamentos..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <select className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-auto">
                <option value="all">Todos los Estados</option>
                <option value="active">Activa</option>
                <option value="completed">Completada</option>
                <option value="discontinued">Discontinuada</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicamento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosis</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frecuencia</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Próxima Recarga</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {medications.map((med) => (
                  <tr key={med.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-secondary-900">{med.nombre}</div>
                      <div className="text-sm text-secondary-500">ID: #{med.id.padStart(6, '0')}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-900">{med.paciente}</td>
                    <td className="px-6 py-4 text-sm text-secondary-900">{med.dosis}</td>
                    <td className="px-6 py-4 text-sm text-secondary-900">{med.frecuencia}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        med.estado === 'Activa'
                          ? 'bg-green-50 text-green-700 border border-green-100'
                          : med.estado === 'Completada'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {med.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-900">
                      {med.proximaRecarga || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}