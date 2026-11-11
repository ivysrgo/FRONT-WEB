export interface AdminReportItem {
  id: string;
  articleId?: string;
  authorId: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  author: string;
  title: string;
  description: string;
  statusBadge?: 'Eliminada' | 'Rechazada' | string;
  reporter: {
    name: string;
    time: string;
    date: string;
  };
  reason: {
    category: string;
    description: string;
  };
  reportedUser: {
    name: string;
    email: string;
    phone: string;
    rating: number;
    activePosts: number;
    previousReports: number;
    activeSince: string;
  };
  article: {
    category: string;
    condition: string;
    imageUrl: string;
    tags?: string[];
    daysElapsed: number;
    requests: number;
  };
}

const reportes = [
  {
    id: 'r1',
    articleId: '2',
    authorId: 'andres-saldarravia',
    type: 'DONACIÓN',
    author: 'Andrés S.',
    title: 'Camisas de trabajo (x3)',
    description: 'Algodón liviano, manga corta. Cuellos en buen estado, una tiene un botón de repuesto cosido dentro.',
    reporter: {
      name: 'Enrique Martinez',
      time: '11:23',
      date: 'Octubre 12 del 2026'
    },
    reason: {
      category: 'Información falsa o engañosa',
      description: 'El por el que reporto esta publicacion es porque tiene informacion falsa y aparte soez contra la comunidad. Estas camisas en realidad representan una burla en contra de la historia de la comunidad y no me parece, hagan algo urgente por favor.'
    },
    reportedUser: {
      name: 'Andrés Saldarravia',
      email: 'andres.saldarravia@gmail.com',
      phone: '310 4567890',
      rating: 4.5,
      activePosts: 3,
      previousReports: 12,
      activeSince: 'Mayo 12 del 2025'
    },
    article: {
      category: 'ROPA',
      condition: 'Con Uso',
      imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=60',
      tags: ['M', 'Hombre', 'Cálida'],
      daysElapsed: 16,
      requests: 3
    }
  },
  {
    id: 'r2',
    authorId: 'julian-espinoza',
    type: 'INTERCAMBIO',
    author: 'Julián E.',
    title: 'Diccionario bilingüe Oxford',
    description: 'Tengo un diccionario de francés y una gramática avanzada para intercambiar.',
    reporter: {
      name: 'María López',
      time: '09:45',
      date: 'Octubre 14 del 2026'
    },
    reason: {
      category: 'Información incompleta',
      description: 'El reporte solicita revisar la información y las condiciones del intercambio de esta publicación.'
    },
    reportedUser: {
      name: 'Julian Espinoza',
      email: 'jujuyespi@gmail.com',
      phone: '317 1221890',
      rating: 3,
      activePosts: 2,
      previousReports: 1,
      activeSince: 'Marzo 8 del 2026'
    },
    article: {
      category: 'LIBROS',
      condition: 'Buen estado',
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60',
      daysElapsed: 8,
      requests: 3
    }
  }
] satisfies AdminReportItem[];

export const reportesPendientes = reportes;

export const reportesHistorial: AdminReportItem[] = [
  { ...reportes[0], id: 'h1', statusBadge: 'Eliminada' },
  { ...reportes[1], id: 'h2', statusBadge: 'Rechazada' },
  {
    ...reportes[0],
    id: 'h3',
    authorId: 'laura-vargas',
    type: 'INTERCAMBIO',
    author: 'Laura V.',
    title: 'Abrigo de paño gris',
    description: 'Ofrezco una chaqueta impermeable talla M en buen estado.',
    reportedUser: {
      ...reportes[0].reportedUser,
      name: 'Laura Vargas',
      email: 'laura.vargas@gmail.com',
      phone: '315 7654321',
      rating: 4.2
    },
    statusBadge: 'Eliminada'
  }
];
