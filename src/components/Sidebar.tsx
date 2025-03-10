import React from 'react';
import { Home, Users, Calendar, FileText, Settings, LogOut, Activity, Pill, Stethoscope } from 'lucide-react';

interface SidebarProps {
  onNavigate: (page: 'dashboard' | 'patients' | 'appointments' | 'vitals' | 'medications' | 'records' | 'settings') => void;
  currentPage: string;
}

export default function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  return (
    <div className="bg-white border-r border-gray-200 text-secondary-600 w-64 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <Stethoscope className="w-8 h-8 text-primary-600" />
        <div>
          <span className="text-xl font-bold text-primary-600">MedCare</span>
          <span className="text-xs block text-secondary-500">Sistema Sanitario</span>
        </div>
      </div>
      
      <nav className="space-y-1">
        {[
          { icon: Home, label: 'Inicio', value: 'dashboard' },
          { icon: Users, label: 'Pacientes', value: 'patients' },
          { icon: Calendar, label: 'Citas', value: 'appointments' },
          { icon: Activity, label: 'Signos Vitales', value: 'vitals' },
          { icon: Pill, label: 'Medicamentos', value: 'medications' },
          { icon: FileText, label: 'Registros', value: 'records' },
          { icon: Settings, label: 'Configuración', value: 'settings' },
        ].map(({ icon: Icon, label, value }) => (
          <button
            key={label}
            onClick={() => onNavigate(value as any)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
              currentPage === value
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'hover:bg-gray-50 text-secondary-600'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-6 px-3">
          <img
            src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=40&h=40"
            alt="Perfil de la doctora"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-secondary-900">Dra. Ana Rodríguez</p>
            <p className="text-xs text-secondary-500">Cardióloga</p>
          </div>
        </div>

        <button className="flex items-center gap-3 w-full p-3 text-secondary-600 hover:bg-gray-50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}