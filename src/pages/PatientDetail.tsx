import React, { useState, useEffect } from 'react';
import { Paciente, Medicamento, RegistroMedico, Cita } from '../types';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Clock, Heart, Activity, Thermometer, Droplets, Edit, Plus, FileText, User } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PatientDetailProps {
  patient: Paciente;
  onBack: () => void;
  medications: Medicamento[];
  records: RegistroMedico[];
  appointments: Cita[];
}

export default function PatientDetail({ patient, onBack, medications = [], records = [], appointments = [] }: PatientDetailProps) {
  const [activeTab, setActiveTab] = useState<'información' | 'medicamentos' | 'registros' | 'citas'>('información');
  const [filteredRecords, setFilteredRecords] = useState<RegistroMedico[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Cita[]>([]);

  useEffect(() => {
    // Filtrar registros médicos por pacienteId o por nombre de paciente
    const patientRecords = records.filter(record => 
      (record.pacienteId && record.pacienteId === patient.id) || 
      record.paciente === patient.nombre
    );
    setFilteredRecords(patientRecords);

    // Filtrar citas por nombre de paciente
    const patientAppointments = appointments.filter(appointment => 
      appointment.nombrePaciente === patient.nombre
    );
    setFilteredAppointments(patientAppointments);
  }, [patient, records, appointments]);

  const statusColors = {
    'Estable': 'bg-green-50 text-green-700 border-green-100',
    'Crítico': 'bg-red-50 text-red-700 border-red-100',
    'En recuperación': 'bg-amber-50 text-amber-700 border-amber-100'
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button 
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-gray-100 text-secondary-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-secondary-900">Detalles del Paciente</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información del paciente */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src={patient.imagen}
                alt={patient.nombre}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 mb-4"
              />
              <h2 className="text-xl font-bold text-secondary-900">{patient.nombre}</h2>
              <p className="text-secondary-500">ID: #{patient.id.padStart(6, '0')}</p>
              
              <div className="mt-4">
                <span className={`px-3 py-1 rounded-full text-sm border ${statusColors[patient.estado]}`}>
                  {patient.estado}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary-50 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Edad</p>
                  <p className="text-secondary-900">{patient.edad} años</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary-50 p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Género</p>
                  <p className="text-secondary-900">{patient.género}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary-50 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Última Visita</p>
                  <p className="text-secondary-900">{format(new Date(patient.últimaVisita), 'dd/MM/yyyy', { locale: es })}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary-50 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Próxima Cita</p>
                  <p className="text-secondary-900">{format(new Date(patient.próximaCita), 'dd/MM/yyyy', { locale: es })}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="font-medium text-secondary-900 mb-4">Información Médica</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-primary-500" />
                    <p className="text-sm text-secondary-600">Condición</p>
                  </div>
                  <p className="font-medium text-secondary-900">{patient.condición}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Pestañas */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100">
              <div className="flex flex-wrap">
                {[
                  { id: 'información', label: 'Información' },
                  { id: 'medicamentos', label: 'Medicamentos' },
                  { id: 'registros', label: 'Registros' },
                  { id: 'citas', label: 'Citas' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-secondary-600 hover:text-secondary-900'
                    }`}
                    onClick={() => setActiveTab(tab.id as any)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'información' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg text-secondary-900">Historial Médico</h3>
                    <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                      <Edit className="w-4 h-4" />
                      <span>Editar</span>
                    </button>
                  </div>
                  
                  <div className="prose max-w-none text-secondary-600">
                    <p>El paciente presenta {patient.condición} y está actualmente en estado {patient.estado}.</p>
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-lg text-secondary-900">Condición Actual</h3>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-secondary-900 mb-2">{patient.condición}</h4>
                      <p className="text-secondary-600">El paciente requiere seguimiento regular para monitorizar su evolución.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'medicamentos' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg text-secondary-900">Medicamentos Actuales</h3>
                    <button className="text-sm bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-1">
                      <Plus className="w-4 h-4" />
                      <span>Añadir Medicamento</span>
                    </button>
                  </div>
                  
                  {medications.length > 0 ? (
                    <div className="space-y-4">
                      {medications.map(med => (
                        <div key={med.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium text-secondary-900">{med.nombre}</h4>
                              <p className="text-sm text-secondary-500">{med.dosis} - {med.frecuencia}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              med.estado === 'Activa' ? 'bg-green-50 text-green-700' : 
                              med.estado === 'Completada' ? 'bg-blue-50 text-blue-700' : 
                              'bg-amber-50 text-amber-700'
                            }`}>
                              {med.estado}
                            </span>
                          </div>
                          <div className="mt-2 flex justify-between text-xs text-secondary-500">
                            <span>Recetado: {format(new Date(med.fechaInicio), 'dd/MM/yyyy', { locale: es })}</span>
                            {med.fechaFin && <span>Hasta: {format(new Date(med.fechaFin), 'dd/MM/yyyy', { locale: es })}</span>}
                          </div>
                          <div className="mt-2 text-sm text-secondary-600">
                            <p>Recetado por: {med.recetadoPor}</p>
                            {med.proximaRecarga && med.proximaRecarga !== 'N/A' && (
                              <p className="mt-1 text-primary-600">Próxima recarga: {format(new Date(med.proximaRecarga), 'dd/MM/yyyy', { locale: es })}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-secondary-500">
                      No hay medicamentos registrados para este paciente.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'registros' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg text-secondary-900">Registros Médicos</h3>
                    <button className="text-sm bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>Nuevo Registro</span>
                    </button>
                  </div>
                  
                  {filteredRecords.length > 0 ? (
                    <div className="space-y-4">
                      {filteredRecords.map(record => (
                        <div key={record.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-secondary-900">{record.titulo}</h4>
                              <p className="text-sm text-secondary-500">
                                {format(new Date(record.fecha), 'dd MMM yyyy', { locale: es })} • {record.departamento}
                              </p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              record.estado === 'Final' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {record.estado}
                            </span>
                          </div>
                          {record.contenido && (
                            <div className="mt-2 bg-gray-50 p-2 rounded text-sm">
                              <p className="text-secondary-600">{record.contenido}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-secondary-500">
                      No hay registros médicos para este paciente.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'citas' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg text-secondary-900">Historial de Citas</h3>
                    <button className="text-sm bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Programar Cita</span>
                    </button>
                  </div>
                  
                  {filteredAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {filteredAppointments.map(appointment => (
                        <div key={appointment.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium text-secondary-900">{appointment.tipo}</h4>
                              <div className="flex items-center gap-2 text-sm text-secondary-500">
                                <Clock className="w-3 h-3" />
                                <span>{appointment.hora}</span>
                                {appointment.fecha && (
                                  <span className="flex items-center gap-1 ml-2">
                                    <Calendar className="w-3 h-3" />
                                    {format(new Date(appointment.fecha), 'dd/MM/yyyy', { locale: es })}
                                  </span>
                                )}
                                {appointment.doctor && (
                                  <span className="flex items-center gap-1 ml-2">
                                    <User className="w-3 h-3" />
                                    {appointment.doctor}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              appointment.estado === 'Programada' ? 'bg-blue-50 text-blue-700' :
                              appointment.estado === 'Completada' ? 'bg-green-50 text-green-700' :
                              appointment.estado === 'En progreso' ? 'bg-purple-50 text-purple-700' :
                              'bg-amber-50 text-amber-700'
                            }`}>
                              {appointment.estado}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-secondary-500">
                      No hay citas programadas para este paciente.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}