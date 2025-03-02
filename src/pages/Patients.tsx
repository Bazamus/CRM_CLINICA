import React, { useState } from 'react';
import { Paciente } from '../types';
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PatientsProps {
  patients: Paciente[];
  onSelectPatient: (patient: Paciente) => void;
}

export default function Patients({ patients, onSelectPatient }: PatientsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;

  const filteredPatients = patients.filter(patient => 
    patient.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.includes(searchTerm) ||
    patient.condición.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-secondary-900">Pacientes</h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar pacientes..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg text-secondary-700 hover:bg-gray-50">
            <Filter className="w-5 h-5" />
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Nuevo Paciente</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Paciente</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Edad</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Género</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Condición</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Estado</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Última Visita</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map(patient => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-secondary-600">#{patient.id.padStart(6, '0')}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={patient.imagen}
                        alt={patient.nombre}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium text-secondary-900">{patient.nombre}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-secondary-600">{patient.edad}</td>
                  <td className="py-3 px-4 text-sm text-secondary-600">{patient.género}</td>
                  <td className="py-3 px-4 text-sm text-secondary-600">{patient.condición}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      patient.estado === 'Estable' ? 'bg-green-50 text-green-700' :
                      patient.estado === 'Crítico' ? 'bg-red-50 text-red-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {patient.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-secondary-600">
                    {format(new Date(patient.últimaVisita), 'dd/MM/yyyy', { locale: es })}
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      onClick={() => onSelectPatient(patient)}
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentPatients.length === 0 && (
          <div className="text-center py-8 text-secondary-500">
            No se encontraron pacientes con el término de búsqueda.
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100">
            <div className="text-sm text-secondary-500">
              Mostrando <span className="font-medium">{indexOfFirstPatient + 1}</span> a <span className="font-medium">
                {Math.min(indexOfLastPatient, filteredPatients.length)}
              </span> de <span className="font-medium">{filteredPatients.length}</span> pacientes
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border ${
                  currentPage === 1
                    ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                    : 'border-gray-200 text-secondary-600 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border ${
                  currentPage === totalPages
                    ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                    : 'border-gray-200 text-secondary-600 hover:bg-gray-50'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}