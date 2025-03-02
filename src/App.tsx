import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetail from './pages/PatientDetail';
import Appointments from './pages/Appointments';
import Vitals from './pages/Vitals';
import Medications from './pages/Medications';
import Records from './pages/Records';
import Settings from './pages/Settings';
import { Paciente, Cita, Medicamento, RegistroMedico } from './types';
import { pacientes, citas, medicamentosPaciente, registrosPaciente, registrosMedicos } from './data';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Paciente | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    // Si navegamos fuera de la página de detalles del paciente, limpiamos el paciente seleccionado
    if (page !== 'patient-detail') {
      setSelectedPatient(null);
    }
  };

  const handleSelectPatient = (patient: Paciente) => {
    setSelectedPatient(patient);
    setCurrentPage('patient-detail');
  };

  // Convertir el objeto medicamentosPaciente en un array plano de medicamentos
  const todosLosMedicamentos = Object.values(medicamentosPaciente).flat();

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard patients={pacientes} appointments={citas} onSelectPatient={handleSelectPatient} />;
      case 'patients':
        return <Patients patients={pacientes} onSelectPatient={handleSelectPatient} />;
      case 'appointments':
        return <Appointments 
          appointments={citas} 
          patients={pacientes}
          pacientesDestacados={pacientes.slice(0, 3)}
          citasHoy={citas.filter(cita => {
            const today = new Date();
            const citaDate = new Date(cita.fecha);
            return citaDate.toDateString() === today.toDateString();
          })}
        />;
      case 'vitals':
        return <Vitals patients={pacientes} />;
      case 'medications':
        return <Medications medications={todosLosMedicamentos} />;
      case 'records':
        return <Records records={registrosMedicos} />;
      case 'settings':
        return <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'patient-detail':
        return selectedPatient ? (
          <PatientDetail 
            patient={selectedPatient} 
            onBack={() => setCurrentPage('patients')} 
            medications={medicamentosPaciente[selectedPatient.id] || []}
            records={registrosPaciente[selectedPatient.id] || []}
            appointments={citas.filter(cita => cita.nombrePaciente === selectedPatient.nombre)}
          />
        ) : (
          <div className="p-6 text-center">
            <p className="text-secondary-500">No se ha seleccionado ningún paciente.</p>
            <button 
              className="mt-4 text-primary-600 hover:text-primary-700"
              onClick={() => setCurrentPage('patients')}
            >
              Volver a la lista de pacientes
            </button>
          </div>
        );
      default:
        return <Dashboard patients={pacientes} appointments={citas} onSelectPatient={handleSelectPatient} />;
    }
  };

  return (
    <div className={`flex h-screen bg-gray-50 ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;