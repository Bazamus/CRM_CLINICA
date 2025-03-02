import React, { useState } from 'react';
import { Heart, Activity, Thermometer, Droplets, Clock, TrendingUp, Download, ChevronDown, User } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paciente } from '../types';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';

interface VitalsProps {
  patients: Paciente[];
}

const historialVitales = {
  '1': [
    { hora: '08:00', frecuenciaCardiaca: 72, presionArterial: 120, temperatura: 37.1, nivelOxigeno: 98 },
    { hora: '10:00', frecuenciaCardiaca: 75, presionArterial: 122, temperatura: 37.0, nivelOxigeno: 97 },
    { hora: '12:00', frecuenciaCardiaca: 78, presionArterial: 125, temperatura: 37.2, nivelOxigeno: 98 },
    { hora: '14:00', frecuenciaCardiaca: 73, presionArterial: 118, temperatura: 37.1, nivelOxigeno: 99 },
    { hora: '16:00', frecuenciaCardiaca: 70, presionArterial: 115, temperatura: 37.0, nivelOxigeno: 98 },
  ],
  '2': [
    { hora: '08:00', frecuenciaCardiaca: 82, presionArterial: 130, temperatura: 37.3, nivelOxigeno: 96 },
    { hora: '10:00', frecuenciaCardiaca: 85, presionArterial: 132, temperatura: 37.4, nivelOxigeno: 95 },
    { hora: '12:00', frecuenciaCardiaca: 88, presionArterial: 135, temperatura: 37.5, nivelOxigeno: 94 },
    { hora: '14:00', frecuenciaCardiaca: 83, presionArterial: 128, temperatura: 37.3, nivelOxigeno: 95 },
    { hora: '16:00', frecuenciaCardiaca: 80, presionArterial: 125, temperatura: 37.2, nivelOxigeno: 96 },
  ]
};

export default function Vitals({ patients }: VitalsProps) {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');

  const vitalData = historialVitales[selectedPatient.id] || historialVitales['1'];

  const currentVitals = {
    frecuenciaCardiaca: vitalData[vitalData.length - 1].frecuenciaCardiaca,
    presionArterial: vitalData[vitalData.length - 1].presionArterial,
    temperatura: vitalData[vitalData.length - 1].temperatura,
    nivelOxigeno: vitalData[vitalData.length - 1].nivelOxigeno,
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Signos Vitales</h1>
            <p className="text-secondary-600">Monitoreo de signos vitales en tiempo real</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            {/* Selector de Paciente */}
            <div className="relative">
              <button
                onClick={() => setIsPatientDropdownOpen(!isPatientDropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <img
                  src={selectedPatient.imagen}
                  alt={selectedPatient.nombre}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-secondary-900">{selectedPatient.nombre}</p>
                  <p className="text-xs text-secondary-500">ID: #{selectedPatient.id.padStart(6, '0')}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-secondary-400" />
              </button>

              {isPatientDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    {patients.map(patient => (
                      <button
                        key={patient.id}
                        onClick={() => {
                          setSelectedPatient(patient);
                          setIsPatientDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <img
                          src={patient.imagen}
                          alt={patient.nombre}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="text-left">
                          <p className="text-sm font-medium text-secondary-900">{patient.nombre}</p>
                          <p className="text-xs text-secondary-500">ID: #{patient.id.padStart(6, '0')}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Selector de Rango de Tiempo */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="24h">Últimas 24 Horas</option>
              <option value="7d">Últimos 7 Días</option>
              <option value="30d">Últimos 30 Días</option>
            </select>

            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-secondary-600 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Exportar Datos</span>
            </button>
          </div>
        </div>

        {/* Tarjeta de Información del Paciente */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={selectedPatient.imagen}
              alt={selectedPatient.nombre}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            />
            <div>
              <h2 className="text-xl font-semibold text-secondary-900">{selectedPatient.nombre}</h2>
              <p className="text-secondary-600">
                {selectedPatient.edad} años • {selectedPatient.genero} • {selectedPatient.condicion}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  selectedPatient.estado === 'Estable'
                    ? 'bg-green-50 text-green-700'
                    : selectedPatient.estado === 'Crítico'
                    ? 'bg-red-50 text-red-700'
                    : 'bg-amber-50 text-amber-700'
                }`}>
                  {selectedPatient.estado}
                </span>
                <span className="text-sm text-secondary-500">Última actualización: hace 5 minutos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { 
              label: 'Frecuencia Cardíaca',
              value: currentVitals.frecuenciaCardiaca,
              unit: 'PPM',
              icon: Heart,
              color: 'text-red-500',
              bg: 'bg-red-50',
              trend: '+2 desde última lectura'
            },
            {
              label: 'Presión Arterial',
              value: currentVitals.presionArterial,
              unit: 'mmHg',
              icon: Activity,
              color: 'text-primary-500',
              bg: 'bg-primary-50',
              trend: 'Estable'
            },
            {
              label: 'Temperatura Corporal',
              value: currentVitals.temperatura,
              unit: '°C',
              icon: Thermometer,
              color: 'text-amber-500',
              bg: 'bg-amber-50',
              trend: '+0.1 desde última lectura'
            },
            {
              label: 'Nivel de Oxígeno',
              value: currentVitals.nivelOxigeno,
              unit: '%',
              icon: Droplets,
              color: 'text-blue-500',
              bg: 'bg-blue-50',
              trend: 'Rango normal'
            }
          ].map(({ label, value, unit, icon: Icon, color, bg, trend }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-secondary-600 text-sm">{label}</span>
                <div className={`${bg} p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-secondary-900">{value}</span>
                <span className="text-secondary-600">{unit}</span>
              </div>
              <p className="text-sm text-secondary-500 mt-2">{trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Frecuencia Cardíaca */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-secondary-900">Frecuencia Cardíaca</h2>
                <p className="text-sm text-secondary-500">Monitoreo de 24 horas</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-500">
                <Clock className="w-4 h-4" />
                <span>Actualizado: {format(new Date(), 'HH:mm', { locale: es })}</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={vitalData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="hora" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                  />
                  <YAxis 
                    domain={[60, 100]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="frecuenciaCardiaca" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: '#ef4444', strokeWidth: 0 }} 
                    activeDot={{ r: 6, fill: '#ef4444', strokeWidth: 0 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Presión Arterial */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-secondary-900">Presión Arterial</h2>
                <p className="text-sm text-secondary-500">Monitoreo de 24 horas</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-500">
                <TrendingUp className="w-4 h-4" />
                <span>Tendencia: Estable</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={vitalData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="hora" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                  />
                  <YAxis 
                    domain={[90, 150]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="presionArterial" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} 
                    activeDot={{ r: 6, fill: '#3b82f6', strokeWidth: 0 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}