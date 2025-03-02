import React from 'react';
import { User, Bell, Shield, Key, Globe, Palette, HelpCircle, Mail } from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export default function Settings({ isDarkMode, setIsDarkMode }: SettingsProps) {
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-900">Configuración</h1>
          <p className="text-secondary-600">Gestiona tu cuenta y preferencias de la aplicación</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          {/* Profile Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=120&h=120"
                alt="Perfil"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
              />
              <div>
                <h2 className="text-xl font-semibold text-secondary-900">Dra. Sara Martínez</h2>
                <p className="text-secondary-600">Cardióloga</p>
                <button className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Cambiar Foto de Perfil
                </button>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="divide-y divide-gray-200">
            {[
              {
                icon: User,
                title: 'Información Personal',
                description: 'Actualiza tus datos personales e información',
                fields: [
                  { label: 'Nombre Completo', value: 'Dra. Sara Martínez', type: 'text' },
                  { label: 'Correo Electrónico', value: 'sara.martinez@hospital.com', type: 'email' },
                  { label: 'Teléfono', value: '+34 612 345 678', type: 'tel' },
                  { label: 'Departamento', value: 'Cardiología', type: 'text' }
                ]
              },
              {
                icon: Bell,
                title: 'Notificaciones',
                description: 'Configura cómo recibes las notificaciones',
                options: [
                  { label: 'Notificaciones por Correo', checked: true },
                  { label: 'Notificaciones Push', checked: true },
                  { label: 'Alertas SMS', checked: false },
                  { label: 'Actualizaciones de Pacientes Críticos', checked: true }
                ]
              },
              {
                icon: Shield,
                title: 'Privacidad y Seguridad',
                description: 'Gestiona tus preferencias de seguridad y privacidad de datos',
                options: [
                  { label: 'Autenticación de Dos Factores', checked: true },
                  { label: 'Alertas de Inicio de Sesión', checked: true },
                  { label: 'Compartir Datos', checked: false }
                ]
              },
              {
                icon: Palette,
                title: 'Apariencia',
                description: 'Personaliza la interfaz de la aplicación',
                theme: true
              }
            ].map((section) => (
              <div key={section.title} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <section.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">{section.title}</h3>
                    <p className="text-sm text-secondary-600">{section.description}</p>
                  </div>
                </div>

                {'fields' in section ? (
                  <div className="space-y-4">
                    {section.fields.map((field) => (
                      <div key={field.label}>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          defaultValue={field.value}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    ))}
                    <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                      Guardar Cambios
                    </button>
                  </div>
                ) : 'options' in section ? (
                  <div className="space-y-3">
                    {section.options.map((option) => (
                      <label key={option.label} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked={option.checked}
                          className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                        />
                        <span className="text-secondary-900">{option.label}</span>
                      </label>
                    ))}
                    <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                      Guardar Preferencias
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-secondary-900">Modo Oscuro</span>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                        <input
                          type="checkbox"
                          id="toggle"
                          className="absolute w-0 h-0 opacity-0"
                          checked={isDarkMode}
                          onChange={(e) => setIsDarkMode(e.target.checked)}
                        />
                        <label
                          htmlFor="toggle"
                          className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                            isDarkMode ? 'bg-primary-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ${
                              isDarkMode ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </label>
                      </div>
                    </label>
                    <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                      Guardar Preferencias
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: HelpCircle, title: 'Centro de Ayuda', description: 'Obtén ayuda y soporte' },
            { icon: Mail, title: 'Contactar Soporte', description: 'Comunícate con nuestro equipo' },
            { icon: Globe, title: 'Idioma', description: 'Cambia tu idioma' },
            { icon: Key, title: 'Cambiar Contraseña', description: 'Actualiza tus credenciales' }
          ].map((link) => (
            <button
              key={link.title}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-primary-50 rounded-lg">
                <link.icon className="w-5 h-5 text-primary-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-secondary-900">{link.title}</h3>
                <p className="text-sm text-secondary-600">{link.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}