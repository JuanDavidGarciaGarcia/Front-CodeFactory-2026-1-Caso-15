export type UserRole = "client" | "provider" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  businessName?: string;
  documentId?: string;
  address?: string;
  categoryId?: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  accentColor: string;
  isActive: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  providerId: string;
  price: number;
  duration: number;
  modality: "presencial" | "virtual";
  image?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  clientId: string;
  providerId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DataState {
  categories: Category[];
  services: Service[];
  bookings: Booking[];
  isLoading: boolean;
}
