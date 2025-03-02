import React from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Cita, Paciente } from '../types';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, LineChart, CartesianGrid, XAxis, YAxis, Line } from 'recharts';

interface AppointmentsProps {
  appointments: Cita[];
  pacientesDestacados?: Paciente[];
  dataGraficoCitas?: any[];
  dataTendencias?: any[];
  citasHoy?: Cita[];
}

export default function Appointments({ 
  appointments = [], 
  pacientesDestacados = [], 
  dataGraficoCitas = [], 
  dataTendencias = [], 
  citasHoy = [] 
}: AppointmentsProps) {
  const today = new Date();
  const timeSlots = Array.from({ length: 8 }, (_, i) => format(new Date().setHours(9 + i, 0), 'HH:mm', { locale: es }));

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Citas</h1>
            <p className="text-secondary-600">Programa y gestiona citas de pacientes</p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-secondary-600 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtrar</span>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              <Plus className="w-4 h-4" />
              <span>Nueva Cita</span>
            </button>
          </div>
        </div>

        {/* Sección de Pacientes Destacados */}
        {pacientesDestacados.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {pacientesDestacados.map(paciente => (
              <div key={paciente.id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={paciente.imagen}
                    alt={paciente.nombre}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-secondary-900">{paciente.nombre}</h3>
                    <p className="text-sm text-secondary-600">{paciente.condición}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${ 
                      paciente.estado === 'Estable' ? 'bg-green-100 text-green-700' :
                      paciente.estado === 'Crítico' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {paciente.estado}
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-sm">
                  <p className="text-secondary-600">
                    <CalendarIcon className="inline mr-2 w-4 h-4" />
                    {format(new Date(paciente.próximaCita), 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sección de Gráficos */}
        {(dataGraficoCitas.length > 0 || dataTendencias.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-semibold text-lg mb-4">Distribución de Citas</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataGraficoCitas}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#3B82F6"
                    />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-semibold text-lg mb-4">Tendencias Mensuales</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataTendencias}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="citas"
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Citas para Hoy */}
        {citasHoy.length > 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Citas Programadas para Hoy</h3>
              <span className="text-secondary-600">
                {format(today, 'EEEE dd MMMM', { locale: es })}
              </span>
            </div>
            
            <div className="space-y-4">
              {citasHoy.map(cita => (
                <div
                  key={cita.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cita.imagenPaciente}
                      alt={cita.nombrePaciente}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{cita.nombrePaciente}</p>
                      <p className="text-sm text-secondary-600">{cita.tipo}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium">{cita.hora}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      cita.estado === 'Programada' ? 'bg-blue-100 text-blue-700' :
                      cita.estado === 'En progreso' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {cita.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center text-secondary-600">
            No hay citas programadas para hoy
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mt-6">
          <div className="flex flex-col md:flex-row border-b border-gray-100">
            {/* Barra lateral del calendario */}
            <div className="w-full md:w-64 border-r border-gray-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-secondary-900">{format(today, 'MMMM yyyy', { locale: es })}</h2>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(day => (
                  <div key={day} className="text-secondary-500 font-medium py-1">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: 35 }, (_, i) => (
                  <button
                    key={i}
                    className={`p-2 text-sm rounded-lg ${
                      i === 14
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'hover:bg-gray-50 text-secondary-900'
                    }`}
                  >
                    {((i + 1) % 31) + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Cuadrícula de horarios */}
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-1 divide-y divide-gray-100">
                {timeSlots.map((time, index) => (
                  <div key={time} className="min-h-[100px] relative group">
                    <div className="absolute left-4 top-2 text-sm text-secondary-500">{time}</div>
                    {appointments
                      .filter(apt => {
                        const aptTime = format(new Date(apt.fecha || ''), 'HH:mm', { locale: es });
                        return aptTime === time;
                      })
                      .map(apt => (
                        <div
                          key={apt.id}
                          className={`absolute left-16 right-4 top-2 p-3 rounded-lg ${
                            apt.estado === 'Completada'
                              ? 'bg-green-50 border border-green-100'
                              : apt.estado === 'En espera'
                              ? 'bg-amber-50 border border-amber-100'
                              : 'bg-blue-50 border border-blue-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-secondary-900">{apt.nombrePaciente}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              apt.estado === 'Completada'
                                ? 'bg-green-100 text-green-700'
                                : apt.estado === 'En espera'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {apt.estado}
                            </span>
                          </div>
                          <p className="text-sm text-secondary-600 mt-1">{apt.tipo}</p>
                        </div>
                      ))}
                    <button className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-gray-50/50 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}