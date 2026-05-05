import type { User, Category, Service, Booking } from "@/types";
import { mockCategories, mockServices, mockBookings, mockUsers } from "@/data/mockData";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Auth Services
export const loginUser = async (
  email: string,
  _password: string,
  role: "client" | "provider"
): Promise<User | null> => {
  await delay(800);
  const user = mockUsers.find((u) => u.email === email && u.role === role);
  return user || mockUsers.find((u) => u.role === role) || null;
};

export const registerUser = async (userData: Partial<User>): Promise<User> => {
  await delay(800);
  const newUser: User = {
    id: `user-${Date.now()}`,
    email: userData.email || "",
    name: userData.name || "",
    lastName: userData.lastName || "",
    role: userData.role || "client",
    phone: userData.phone,
    businessName: userData.businessName,
    documentId: userData.documentId,
  };
  return newUser;
};

// Category Services
export const getCategories = async (): Promise<Category[]> => {
  await delay(800);
  return [...mockCategories];
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  await delay(500);
  return mockCategories.find((c) => c.id === id) || null;
};

export const createCategory = async (
  category: Omit<Category, "id" | "createdAt">
): Promise<Category> => {
  await delay(800);
  const newCategory: Category = {
    ...category,
    id: `cat-${Date.now()}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
  return newCategory;
};

export const updateCategory = async (
  id: string,
  updates: Partial<Category>
): Promise<Category | null> => {
  await delay(800);
  const category = mockCategories.find((c) => c.id === id);
  if (!category) return null;
  return { ...category, ...updates };
};

export const toggleCategoryStatus = async (id: string): Promise<void> => {
  await delay(500);
};

// Service Services
export const getServices = async (): Promise<Service[]> => {
  await delay(800);
  return [...mockServices];
};

export const getServiceById = async (id: string): Promise<Service | null> => {
  await delay(500);
  return mockServices.find((s) => s.id === id) || null;
};

export const createService = async (
  service: Omit<Service, "id" | "createdAt">
): Promise<Service> => {
  await delay(800);
  const newService: Service = {
    ...service,
    id: `serv-${Date.now()}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
  return newService;
};

export const updateService = async (
  id: string,
  updates: Partial<Service>
): Promise<Service | null> => {
  await delay(800);
  const service = mockServices.find((s) => s.id === id);
  if (!service) return null;
  return { ...service, ...updates };
};

export const toggleServiceStatus = async (id: string): Promise<void> => {
  await delay(500);
};

// Booking Services
export const getBookings = async (): Promise<Booking[]> => {
  await delay(800);
  return [...mockBookings];
};

export const getBookingsByUser = async (userId: string): Promise<Booking[]> => {
  await delay(800);
  return mockBookings.filter(
    (b) => b.clientId === userId || b.providerId === userId
  );
};

export const createBooking = async (
  booking: Omit<Booking, "id" | "createdAt">
): Promise<Booking> => {
  await delay(800);
  const newBooking: Booking = {
    ...booking,
    id: `book-${Date.now()}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
  return newBooking;
};
