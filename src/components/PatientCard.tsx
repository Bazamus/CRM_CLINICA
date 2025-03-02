import React from 'react';
import { Paciente } from '../types';
import { Activity, Heart, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PatientCardProps {
  patient: Paciente;
  onClick?: () => void;
}

export default function PatientCard({ patient, onClick }: PatientCardProps) {
  const statusColors = {
    'Estable': 'bg-green-50 text-green-700 border-green-100',
    'Crítico': 'bg-red-50 text-red-700 border-red-100',
    'En recuperación': 'bg-amber-50 text-amber-700 border-amber-100'
  };

  return (
    <div 
      className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <img
          src={patient.imagen}
          alt={patient.nombre}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-secondary-900">{patient.nombre}</h3>
              <p className="text-sm text-secondary-500">ID: #{patient.id.padStart(6, '0')}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm border ${statusColors[patient.estado]}`}>
              {patient.estado}
            </span>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-secondary-600">
              <Activity className="w-4 h-4 text-primary-500" />
              <span>{patient.condición}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary-600">
              <Heart className="w-4 h-4 text-red-500" />
              <span>72 BPM</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="flex gap-4 text-sm">
              <span className="text-secondary-500">Última visita: <span className="text-secondary-700">{format(new Date(patient.últimaVisita), 'dd/MM/yyyy', { locale: es })}</span></span>
              <span className="text-secondary-500">Próxima: <span className="text-primary-600 font-medium">{format(new Date(patient.próximaCita), 'dd/MM/yyyy', { locale: es })}</span></span>
            </div>
            <button className="text-primary-600 hover:text-primary-700">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}