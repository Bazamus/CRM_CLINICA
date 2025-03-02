import { Paciente, Cita, Medicamento, RegistroMedico } from './types';

export const pacientes: Paciente[] = [
  {
    id: '1',
    nombre: 'Carmen García',
    edad: 45,
    género: 'Mujer',
    condición: 'Hipertensión',
    últimaVisita: '2024-03-10',
    próximaCita: '2024-03-25',
    estado: 'Estable',
    imagen: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '2',
    nombre: 'Antonio Martínez',
    edad: 62,
    género: 'Hombre',
    condición: 'Diabetes Tipo 2',
    últimaVisita: '2024-03-15',
    próximaCita: '2024-03-28',
    estado: 'Crítico',
    imagen: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '3',
    nombre: 'Laura Fernández',
    edad: 28,
    género: 'Mujer',
    condición: 'Recuperación Post-quirúrgica',
    últimaVisita: '2024-03-18',
    próximaCita: '2024-03-30',
    estado: 'En recuperación',
    imagen: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

// Obtener la fecha actual
const hoy = new Date();
const formatearFecha = (diasDespues: number) => {
  const fecha = new Date(hoy);
  fecha.setDate(fecha.getDate() + diasDespues);
  return fecha.toISOString().split('T')[0];
};

export const citas: Cita[] = [
  // Citas para hoy
  {
    id: '1',
    nombrePaciente: 'Carmen García',
    hora: '09:00',
    tipo: 'Seguimiento',
    estado: 'Programada',
    fecha: formatearFecha(0),
    doctor: 'Dr. Rodríguez',
    imagenPaciente: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '2',
    nombrePaciente: 'Antonio Martínez',
    hora: '10:30',
    tipo: 'Urgencia',
    estado: 'En progreso',
    fecha: formatearFecha(0),
    doctor: 'Dra. López',
    imagenPaciente: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '3',
    nombrePaciente: 'Laura Fernández',
    hora: '14:00',
    tipo: 'Revisión',
    estado: 'Completada',
    fecha: formatearFecha(0),
    doctor: 'Dr. Sánchez',
    imagenPaciente: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150'
  },
  
  // Citas para mañana
  {
    id: '4',
    nombrePaciente: 'Miguel Gómez',
    hora: '08:30',
    tipo: 'Primera Consulta',
    estado: 'Programada',
    fecha: formatearFecha(1),
    doctor: 'Dra. López',
    imagenPaciente: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '5',
    nombrePaciente: 'Sofía Ruiz',
    hora: '11:15',
    tipo: 'Análisis',
    estado: 'Programada',
    fecha: formatearFecha(1),
    doctor: 'Dr. Rodríguez',
    imagenPaciente: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?auto=format&fit=crop&q=80&w=150&h=150'
  },
  
  // Citas para pasado mañana
  {
    id: '6',
    nombrePaciente: 'Javier Moreno',
    hora: '09:45',
    tipo: 'Seguimiento',
    estado: 'Programada',
    fecha: formatearFecha(2),
    doctor: 'Dr. Sánchez',
    imagenPaciente: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '7',
    nombrePaciente: 'Elena Torres',
    hora: '13:00',
    tipo: 'Vacunación',
    estado: 'Programada',
    fecha: formatearFecha(2),
    doctor: 'Dra. Martín',
    imagenPaciente: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=150&h=150'
  },
  
  // Citas para dentro de 3 días
  {
    id: '8',
    nombrePaciente: 'Carlos Navarro',
    hora: '10:00',
    tipo: 'Ecografía',
    estado: 'Programada',
    fecha: formatearFecha(3),
    doctor: 'Dr. Jiménez',
    imagenPaciente: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
  },
  
  // Citas para dentro de 4 días
  {
    id: '9',
    nombrePaciente: 'Lucía Serrano',
    hora: '16:30',
    tipo: 'Revisión',
    estado: 'Programada',
    fecha: formatearFecha(4),
    doctor: 'Dra. López',
    imagenPaciente: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&q=80&w=150&h=150'
  },
  
  // Citas para dentro de 5 días
  {
    id: '10',
    nombrePaciente: 'Pablo Herrera',
    hora: '12:15',
    tipo: 'Consulta',
    estado: 'Programada',
    fecha: formatearFecha(5),
    doctor: 'Dr. Rodríguez',
    imagenPaciente: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150'
  },
  
  // Citas para dentro de 6 días
  {
    id: '11',
    nombrePaciente: 'María Jiménez',
    hora: '09:30',
    tipo: 'Control',
    estado: 'Programada',
    fecha: formatearFecha(6),
    doctor: 'Dra. Martín',
    imagenPaciente: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export const medicamentosPaciente: Record<string, Medicamento[]> = {
  '1': [
    {
      id: '1',
      nombre: 'Enalapril',
      dosis: '10mg',
      frecuencia: 'Una vez al día',
      fechaInicio: '2024-01-15',
      fechaFin: '2024-04-15',
      estado: 'Activa',
      recetadoPor: 'Dr. Rodríguez',
      paciente: 'Carmen García',
      proximaRecarga: '2024-04-01'
    },
    {
      id: '2',
      nombre: 'Adiro',
      dosis: '100mg',
      frecuencia: 'Una vez al día',
      fechaInicio: '2024-02-01',
      fechaFin: '2024-05-01',
      estado: 'Activa',
      recetadoPor: 'Dr. Rodríguez',
      paciente: 'Carmen García',
      proximaRecarga: '2024-04-05'
    }
  ],
  '2': [
    {
      id: '3',
      nombre: 'Metformina',
      dosis: '850mg',
      frecuencia: 'Dos veces al día',
      fechaInicio: '2024-01-20',
      fechaFin: '2024-04-20',
      estado: 'Activa',
      recetadoPor: 'Dra. López',
      paciente: 'Antonio Martínez',
      proximaRecarga: '2024-04-10'
    },
    {
      id: '4',
      nombre: 'Insulina Lantus',
      dosis: '20 unidades',
      frecuencia: 'Una vez al día',
      fechaInicio: '2024-02-15',
      fechaFin: '2024-05-15',
      estado: 'Activa',
      recetadoPor: 'Dra. López',
      paciente: 'Antonio Martínez',
      proximaRecarga: '2024-04-15'
    }
  ],
  '3': [
    {
      id: '5',
      nombre: 'Paracetamol',
      dosis: '1g',
      frecuencia: 'Cada 8 horas',
      fechaInicio: '2024-03-18',
      fechaFin: '2024-03-25',
      estado: 'Activa',
      recetadoPor: 'Dr. Sánchez',
      paciente: 'Laura Fernández',
      proximaRecarga: '2024-03-25'
    },
    {
      id: '6',
      nombre: 'Ibuprofeno',
      dosis: '600mg',
      frecuencia: 'Cada 8 horas',
      fechaInicio: '2024-03-18',
      fechaFin: '2024-03-25',
      estado: 'Activa',
      recetadoPor: 'Dr. Sánchez',
      paciente: 'Laura Fernández',
      proximaRecarga: '2024-03-25'
    }
  ]
};

export const registrosPaciente: Record<string, RegistroMedico[]> = {
  '1': [
    {
      id: '1',
      titulo: 'Informe de Cardiología',
      paciente: 'Carmen García',
      tipo: 'Informe',
      fecha: '2024-02-15',
      departamento: 'Cardiología',
      tamaño: '1.2 MB',
      estado: 'Final',
      contenido: 'Paciente con hipertensión controlada. Se recomienda mantener tratamiento actual y revisión en 3 meses.',
      pacienteId: '1'
    },
    {
      id: '2',
      titulo: 'Análisis de Sangre',
      paciente: 'Carmen García',
      tipo: 'Laboratorio',
      fecha: '2024-02-10',
      departamento: 'Hematología',
      tamaño: '0.8 MB',
      estado: 'Final',
      contenido: 'Valores dentro de rangos normales excepto colesterol ligeramente elevado (220 mg/dL).',
      pacienteId: '1'
    }
  ],
  '2': [
    {
      id: '3',
      titulo: 'Control de Diabetes',
      paciente: 'Antonio Martínez',
      tipo: 'Informe',
      fecha: '2024-02-20',
      departamento: 'Endocrinología',
      tamaño: '1.5 MB',
      estado: 'Final',
      contenido: 'Paciente con diabetes tipo 2 descompensada. Se ajusta tratamiento y se solicita revisión en 2 semanas.',
      pacienteId: '2'
    },
    {
      id: '4',
      titulo: 'Fondo de Ojo',
      paciente: 'Antonio Martínez',
      tipo: 'Imagen',
      fecha: '2024-02-18',
      departamento: 'Oftalmología',
      tamaño: '3.2 MB',
      estado: 'Final',
      contenido: 'Se observan signos iniciales de retinopatía diabética. Se recomienda control estricto de glucemia.',
      pacienteId: '2'
    }
  ],
  '3': [
    {
      id: '5',
      titulo: 'Informe Quirúrgico',
      paciente: 'Laura Fernández',
      tipo: 'Informe',
      fecha: '2024-03-15',
      departamento: 'Cirugía',
      tamaño: '2.1 MB',
      estado: 'Final',
      contenido: 'Intervención de apendicectomía sin complicaciones. Evolución favorable.',
      pacienteId: '3'
    },
    {
      id: '6',
      titulo: 'Control Post-operatorio',
      paciente: 'Laura Fernández',
      tipo: 'Informe',
      fecha: '2024-03-18',
      departamento: 'Cirugía',
      tamaño: '0.9 MB',
      estado: 'Preliminar',
      contenido: 'Herida quirúrgica con buena evolución. Se retiran puntos en 7 días.',
      pacienteId: '3'
    }
  ]
};

export const registrosMedicos: RegistroMedico[] = [
  ...registrosPaciente['1'],
  ...registrosPaciente['2'],
  ...registrosPaciente['3']
];