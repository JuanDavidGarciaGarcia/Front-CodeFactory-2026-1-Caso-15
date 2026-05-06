import { apiClient } from '@/lib/api-client'
import type { User } from '@/types'

// ─── AUTH ───────────────────────────────────────────────
export const registerClient = async (data: {
  email: string; password: string; nombre: string; telefono: string
}): Promise<{ token: string; refreshToken: string; user: User }> => {
  return apiClient.auth.post('/auth/register/client', data)
}

export const registerProvider = async (data: {
  email: string
  password: string
  nombreComercial: string
  direccion: string
  telefonoContacto: string
  idCategoria: string  // 👈 agregar
}): Promise<{ token: string; refreshToken: string; user: any }> => {
  return apiClient.auth.post('/auth/register/provider', data)
}

export const loginUser = async (
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string; userId: string; email: string; role: string }> => {
  return apiClient.auth.post('/auth/login', { email, password })
}

export const refreshToken = async (refreshToken: string): Promise<{ token: string; refreshToken: string }> => {
  return apiClient.auth.post('/auth/refresh', { refreshToken })
}

export const logoutUser = async (refreshToken: string): Promise<void> => {
  return apiClient.auth.post('/auth/logout', { refreshToken })
}

// ─── CATALOG ────────────────────────────────────────────
export const getActiveCategories = async () => {
  return apiClient.catalog.get('/catalog/categories/active')
}

export const getActiveServices = async () => {
  return apiClient.catalog.get('/catalog/services/active')
}

export const getServicesByCategory = async (categoryId: string) => {
  return apiClient.catalog.get(`/catalog/services/active/category/${categoryId}`)
}

export const createService = async (data: unknown) => {
  return apiClient.catalog.post('/catalog/services', data)
}

export const updateService = async (id: string, data: unknown) => {
  return apiClient.catalog.put(`/catalog/services/${id}`, data)
}

export const deleteService = async (id: string) => {
  return apiClient.catalog.delete(`/catalog/services/${id}`)
}

// ─── RESERVATION ────────────────────────────────────────
export const getBookings = async () => {
  return apiClient.reservation.get('/reservations')
}

export const createBooking = async (data: unknown) => {
  return apiClient.reservation.post('/reservations', data)
}

export const createCategory = async (data: unknown) => {
  return apiClient.catalog.post('/catalog/categories', data)
}

export const updateCategory = async (id: string, data: unknown) => {
  return apiClient.catalog.put(`/catalog/categories/${id}`, data)
}