import React from 'react';
import { Paciente, Cita } from '../types';
import Stats from '../components/Stats';
import PatientCard from '../components/PatientCard';
import AppointmentList from '../components/AppointmentList';
import { Search, Bell, Filter } from 'lucide-react';

interface DashboardProps {
  patients: Paciente[];
  appointments: Cita[];
  onSelectPatient: (patient: Paciente) => void;
}

export default function Dashboard({ patients, appointments, onSelectPatient }: DashboardProps) {
  // Filtrar citas para hoy
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const todaysAppointments = appointments.filter(appointment => {
    if (!appointment.fecha) return true; // Si no tiene fecha, mostrarla por defecto
    const appointmentDate = new Date(appointment.fecha);
    return appointmentDate >= today && appointmentDate < tomorrow;
  });

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Panel Principal</h1>
            <p className="text-secondary-600">Bienvenida, Dra. Ana Rodríguez</p>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder="Buscar pacientes..."
                className="w-full sm:w-72 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 text-secondary-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg text-secondary-600">
              <Filter className="w-5 h-5" />
            </button>
            
            <button className="relative p-2 hover:bg-gray-100 rounded-lg text-secondary-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <Stats />

        {/* Contenido Principal */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-secondary-900">Pacientes Recientes</h2>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Ver Todos
              </button>
            </div>
            {patients.slice(0, 3).map(patient => (
              <PatientCard 
                key={patient.id} 
                patient={patient}
                onClick={() => onSelectPatient(patient)}
              />
            ))}
          </div>
          
          <div>
            <AppointmentList 
              appointments={todaysAppointments} 
              title="Citas de Hoy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
