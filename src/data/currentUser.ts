// Usuario de ejemplo hasta conectar la autenticación
export interface UserProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  rating: number; // Calificación de la comunidad, de 0 a 5
  avatarUrl?: string;
}

export const CURRENT_USER: UserProfile = {
  name: 'Juan José Perez Cespedes',
  role: 'Miembro de la comunidad',
  email: 'juanelpro2005@gmail.com',
  phone: '343 5678001',
  rating: 3,
};

export const getInitials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
