export interface Paciente {
  id: string;
  nombre: string;
  edad: number;
  género: string;
  condición: string;
  últimaVisita: string;
  próximaCita: string;
  estado: 'Estable' | 'Crítico' | 'En recuperación';
  imagen: string;
}

export interface Cita {
  id: string;
  nombrePaciente: string;
  hora: string;
  tipo: string;
  estado: 'Programada' | 'En progreso' | 'Completada' | 'Cancelada' | 'En espera';
  fecha?: string;
  doctor?: string;
  imagenPaciente?: string;
  imagenDoctor?: string;
}

export interface Medicamento {
  id: string;
  nombre: string;
  dosis: string;
  frecuencia: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'Activa' | 'Completada' | 'Discontinuada';
  recetadoPor: string;
  paciente?: string;
  proximaRecarga?: string;
}

export interface RegistroMedico {
  id: string;
  titulo: string;
  paciente: string;
  tipo: string;
  fecha: string;
  departamento: string;
  tamaño?: string;
  estado: 'Final' | 'Preliminar';
  contenido?: string;
  pacienteId?: string;
}