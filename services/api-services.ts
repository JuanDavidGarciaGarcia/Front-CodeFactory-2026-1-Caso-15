// services/api.ts
import { apiClient } from '@/lib/api-client'
import type { User } from '@/types'

export const registerClient = async (data: {
  email: string
  password: string
  nombre: string
  telefono: string
}): Promise<{ token: string; user: User }> => {
  return apiClient.post('/auth/register/client', data)
}

export const registerProvider = async (data: {
  email: string
  password: string
  nombreComercial: string
  direccion: string
  telefonoContacto: string
}): Promise<{ token: string; user: User }> => {
  return apiClient.post('/auth/register/provider', data)
}

export const loginUser = async (
  email: string,
  password: string,
  role: "client" | "provider"
): Promise<{ token: string; user: User }> => {
  return apiClient.post('/auth/login', { email, password, role })
}