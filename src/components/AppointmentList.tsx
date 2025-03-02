import React, { useState } from 'react';
import { Cita } from '../types';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, User, Plus, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface AppointmentListProps {
  appointments: Cita[];
  title?: string;
}

export default function AppointmentList({ appointments, title = "Citas de Hoy" }: AppointmentListProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  // Generar fechas para el selector
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  // Filtrar citas por fecha seleccionada
  const filteredAppointments = appointments.filter(appointment => {
    if (!appointment.fecha) return false;
    
    const appointmentDate = new Date(appointment.fecha);
    const selectedDateStart = new Date(selectedDate);
    selectedDateStart.setHours(0, 0, 0, 0);
    
    const selectedDateEnd = new Date(selectedDate);
    selectedDateEnd.setHours(23, 59, 59, 999);
    
    const dateMatches = appointmentDate >= selectedDateStart && appointmentDate <= selectedDateEnd;
    
    if (filterStatus === 'todos') {
      return dateMatches;
    }
    
    return dateMatches && appointment.estado === filterStatus;
  });

  const statusColors = {
    'Programada': 'bg-blue-50 text-blue-700 border-blue-100',
    'Completada': 'bg-green-50 text-green-700 border-green-100',
    'Cancelada': 'bg-red-50 text-red-700 border-red-100',
    'En espera': 'bg-amber-50 text-amber-700 border-amber-100',
    'En progreso': 'bg-purple-50 text-purple-700 border-purple-100'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-secondary-900">{title}</h2>
        <div className="flex items-center gap-2">
          <button 
            className="text-secondary-600 hover:bg-gray-100 p-1 rounded-md"
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter className="w-4 h-4" />
          </button>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Ver Todas
          </button>
        </div>
      </div>

      {/* Selector de fechas */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <button 
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => setSelectedDate(addDays(selectedDate, -1))}
          >
            <ChevronLeft className="w-4 h-4 text-secondary-600" />
          </button>
          <span className="text-sm font-medium text-secondary-900">
            {format(selectedDate, 'MMMM yyyy', { locale: es })}
          </span>
          <button 
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          >
            <ChevronRight className="w-4 h-4 text-secondary-600" />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((date, index) => (
            <button
              key={index}
              className={`flex flex-col items-center min-w-[3rem] p-2 rounded-lg ${
                format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                  ? 'bg-primary-50 text-primary-700 border border-primary-100'
                  : 'hover:bg-gray-50 text-secondary-700'
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <span className="text-xs font-medium">
                {format(date, 'EEE', { locale: es })}
              </span>
              <span className="text-sm font-bold">{format(date, 'dd')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filtros */}
      {showFilter && (
        <div className="mb-4 p-2 bg-gray-50 rounded-lg">
          <div className="text-xs font-medium text-secondary-600 mb-2">Filtrar por estado:</div>
          <div className="flex flex-wrap gap-2">
            {['todos', 'Programada', 'En progreso', 'Completada', 'Cancelada', 'En espera'].map(status => (
              <button
                key={status}
                className={`px-2 py-1 text-xs rounded-full ${
                  filterStatus === status
                    ? 'bg-primary-50 text-primary-700 border border-primary-100'
                    : 'bg-white text-secondary-700 border border-gray-200'
                }`}
                onClick={() => setFilterStatus(status)}
              >
                {status === 'todos' ? 'Todos' : status}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Botón de nueva cita */}
      <button className="w-full mb-4 flex items-center justify-center gap-2 p-2 border border-dashed border-gray-200 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors">
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Nueva Cita</span>
      </button>

      {/* Lista de citas */}
      <div className="space-y-3">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="flex-shrink-0">
                {appointment.imagenPaciente ? (
                  <img 
                    src={appointment.imagenPaciente} 
                    alt={appointment.nombrePaciente} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-secondary-900 truncate">{appointment.nombrePaciente}</p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-secondary-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {appointment.hora}
                  </span>
                  {appointment.fecha && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(appointment.fecha), 'dd MMM', { locale: es })}
                    </span>
                  )}
                  {appointment.doctor && (
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {appointment.doctor}
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <span className="text-xs text-secondary-600 bg-gray-50 px-2 py-0.5 rounded">
                    {appointment.tipo}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-2 py-1 text-xs rounded-full border ${statusColors[appointment.estado] || 'bg-gray-50 text-gray-700 border-gray-100'}`}>
                  {appointment.estado}
                </span>
                <button className="text-secondary-400 hover:text-secondary-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-secondary-500">
            No hay citas programadas para {format(selectedDate, 'dd/MM/yyyy', { locale: es })}
          </div>
        )}
      </div>
    </div>
  );
}