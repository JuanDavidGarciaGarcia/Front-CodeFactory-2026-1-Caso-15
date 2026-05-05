# Guía de Integración con Backend

Esta guía detalla los pasos necesarios para conectar el frontend con tu backend API.

## 📋 Requisitos del Backend

Tu backend debe proporcionar una API REST con los siguientes endpoints:

### 1. Autenticación

#### POST `/auth/login`
Autentica un usuario y devuelve tokens.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "client"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "Juan",
    "lastName": "Garcia",
    "role": "client",
    "phone": "1234567890"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/auth/register`
Registra un nuevo usuario.

**Request:**
```json
{
  "email": "newuser@example.com",
  "name": "Juan",
  "lastName": "Garcia",
  "password": "password123",
  "role": "client",
  "phone": "1234567890"
}
```

**Response (201 Created):**
```json
{
  "id": "user-123",
  "email": "newuser@example.com",
  "name": "Juan",
  "lastName": "Garcia",
  "role": "client",
  "phone": "1234567890"
}
```

### 2. Categorías

#### GET `/categories`
Obtiene todas las categorías.

**Response (200 OK):**
```json
[
  {
    "id": "cat-1",
    "name": "Limpieza",
    "description": "Servicios de limpieza",
    "icon": "Home",
    "accentColor": "#FF5733",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "cat-2",
    "name": "Jardinería",
    "description": "Servicios de jardinería",
    "icon": "Leaf",
    "accentColor": "#33FF57",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### GET `/categories/:id`
Obtiene una categoría específica.

**Response (200 OK):**
```json
{
  "id": "cat-1",
  "name": "Limpieza",
  "description": "Servicios de limpieza",
  "icon": "Home",
  "accentColor": "#FF5733",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### POST `/categories`
Crea una nueva categoría (requiere autenticación y rol admin).

**Request:**
```json
{
  "name": "Plomería",
  "description": "Servicios de plomería",
  "icon": "Wrench",
  "accentColor": "#3357FF"
}
```

**Response (201 Created):**
```json
{
  "id": "cat-3",
  "name": "Plomería",
  "description": "Servicios de plomería",
  "icon": "Wrench",
  "accentColor": "#3357FF",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### PUT `/categories/:id`
Actualiza una categoría.

**Request:**
```json
{
  "name": "Plomería Avanzada",
  "description": "Servicios especializados de plomería",
  "icon": "Wrench",
  "accentColor": "#3357FF"
}
```

**Response (200 OK):**
```json
{
  "id": "cat-3",
  "name": "Plomería Avanzada",
  "description": "Servicios especializados de plomería",
  "icon": "Wrench",
  "accentColor": "#3357FF",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### DELETE `/categories/:id`
Elimina una categoría.

**Response (204 No Content)**

### 3. Servicios

#### GET `/services`
Obtiene todos los servicios.

**Query Parameters:**
- `categoryId` (opcional): Filtrar por categoría
- `providerId` (opcional): Filtrar por proveedor
- `skip` (opcional, default: 0): Paginación
- `limit` (opcional, default: 20): Límite de resultados

**Response (200 OK):**
```json
[
  {
    "id": "svc-1",
    "name": "Limpieza Profunda",
    "description": "Limpieza completa de hogares",
    "categoryId": "cat-1",
    "providerId": "user-456",
    "price": 50.00,
    "duration": 120,
    "modality": "presencial",
    "image": "https://example.com/image.jpg",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### GET `/services/:id`
Obtiene un servicio específico.

**Response (200 OK):**
```json
{
  "id": "svc-1",
  "name": "Limpieza Profunda",
  "description": "Limpieza completa de hogares",
  "categoryId": "cat-1",
  "providerId": "user-456",
  "price": 50.00,
  "duration": 120,
  "modality": "presencial",
  "image": "https://example.com/image.jpg",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### POST `/services`
Crea un nuevo servicio (requiere autenticación).

**Request:**
```json
{
  "name": "Limpieza Profunda",
  "description": "Limpieza completa de hogares",
  "categoryId": "cat-1",
  "price": 50.00,
  "duration": 120,
  "modality": "presencial"
}
```

**Response (201 Created):**
```json
{
  "id": "svc-1",
  "name": "Limpieza Profunda",
  "description": "Limpieza completa de hogares",
  "categoryId": "cat-1",
  "providerId": "user-456",
  "price": 50.00,
  "duration": 120,
  "modality": "presencial",
  "image": null,
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### PUT `/services/:id`
Actualiza un servicio.

**Request:**
```json
{
  "name": "Limpieza Profunda Plus",
  "price": 60.00,
  "duration": 150
}
```

**Response (200 OK):**
```json
{
  "id": "svc-1",
  "name": "Limpieza Profunda Plus",
  "description": "Limpieza completa de hogares",
  "categoryId": "cat-1",
  "providerId": "user-456",
  "price": 60.00,
  "duration": 150,
  "modality": "presencial",
  "image": null,
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### DELETE `/services/:id`
Elimina un servicio.

**Response (204 No Content)**

### 4. Reservas

#### GET `/bookings`
Obtiene todas las reservas (filtradas por usuario autenticado).

**Query Parameters:**
- `status` (opcional): Filtrar por estado
- `clientId` (opcional): Filtrar por cliente
- `providerId` (opcional): Filtrar por proveedor
- `skip` (opcional, default: 0): Paginación
- `limit` (opcional, default: 20): Límite de resultados

**Response (200 OK):**
```json
[
  {
    "id": "book-1",
    "serviceId": "svc-1",
    "clientId": "user-789",
    "providerId": "user-456",
    "date": "2024-02-15",
    "time": "10:00",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### GET `/bookings/:id`
Obtiene una reserva específica.

**Response (200 OK):**
```json
{
  "id": "book-1",
  "serviceId": "svc-1",
  "clientId": "user-789",
  "providerId": "user-456",
  "date": "2024-02-15",
  "time": "10:00",
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### POST `/bookings`
Crea una nueva reserva (requiere autenticación).

**Request:**
```json
{
  "serviceId": "svc-1",
  "date": "2024-02-15",
  "time": "10:00"
}
```

**Response (201 Created):**
```json
{
  "id": "book-1",
  "serviceId": "svc-1",
  "clientId": "user-789",
  "providerId": "user-456",
  "date": "2024-02-15",
  "time": "10:00",
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### PUT `/bookings/:id`
Actualiza una reserva (cambiar estado).

**Request:**
```json
{
  "status": "confirmed"
}
```

**Response (200 OK):**
```json
{
  "id": "book-1",
  "serviceId": "svc-1",
  "clientId": "user-789",
  "providerId": "user-456",
  "date": "2024-02-15",
  "time": "10:00",
  "status": "confirmed",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### DELETE `/bookings/:id`
Cancela una reserva.

**Response (204 No Content)**

## 🔐 Autenticación con JWT

### Headers Requeridos

Todos los endpoints protegidos requieren:

```
Authorization: Bearer <token>
Content-Type: application/json
```

### Manejo de Tokens

1. **Obtener Token**: Se proporciona en la respuesta de login
2. **Almacenar Token**: Guarda en `localStorage` (la app lo maneja)
3. **Renovar Token**: Implementa un endpoint `/auth/refresh` si es necesario
4. **Invalidar Token**: Usa `/auth/logout`

## 📝 Pasos para Integración

### Paso 1: Crear Cliente API

```typescript
// lib/api-client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

export const apiClient = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    const response = await fetch(url, {
      headers,
      ...options,
    })
    
    // Manejo de errores
    if (response.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
      throw new Error('No autorizado')
    }
    
    if (response.status === 403) {
      throw new Error('Acceso denegado')
    }
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `Error ${response.status}`)
    }
    
    if (response.status === 204) {
      return null
    }
    
    return response.json()
  },

  get(endpoint: string) {
    return this.fetch(endpoint, { method: 'GET' })
  },

  post(endpoint: string, data?: any) {
    return this.fetch(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  put(endpoint: string, data?: any) {
    return this.fetch(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  patch(endpoint: string, data?: any) {
    return this.fetch(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  delete(endpoint: string) {
    return this.fetch(endpoint, { method: 'DELETE' })
  },
}
```

### Paso 2: Crear Servicios API

```typescript
// services/api.ts
import { apiClient } from '@/lib/api-client'
import type { User, Category, Service, Booking } from '@/types'

// Auth
export const loginUser = async (
  email: string,
  password: string,
  role: string
): Promise<{ user: User; token: string }> => {
  const data = await apiClient.post('/auth/login', { email, password, role })
  if (data.token) {
    localStorage.setItem('authToken', data.token)
  }
  return data
}

export const registerUser = async (userData: Partial<User>): Promise<User> => {
  return apiClient.post('/auth/register', userData)
}

export const logoutUser = async (): Promise<void> => {
  await apiClient.post('/auth/logout')
  localStorage.removeItem('authToken')
}

// Categories
export const getCategories = async (): Promise<Category[]> => {
  return apiClient.get('/categories')
}

export const getCategoryById = async (id: string): Promise<Category> => {
  return apiClient.get(`/categories/${id}`)
}

export const createCategory = async (data: Partial<Category>): Promise<Category> => {
  return apiClient.post('/categories', data)
}

export const updateCategory = async (id: string, data: Partial<Category>): Promise<Category> => {
  return apiClient.put(`/categories/${id}`, data)
}

export const deleteCategory = async (id: string): Promise<void> => {
  return apiClient.delete(`/categories/${id}`)
}

// Services
export const getServices = async (filters?: any): Promise<Service[]> => {
  const query = new URLSearchParams(filters).toString()
  return apiClient.get(`/services${query ? '?' + query : ''}`)
}

export const getServiceById = async (id: string): Promise<Service> => {
  return apiClient.get(`/services/${id}`)
}

export const createService = async (data: Partial<Service>): Promise<Service> => {
  return apiClient.post('/services', data)
}

export const updateService = async (id: string, data: Partial<Service>): Promise<Service> => {
  return apiClient.put(`/services/${id}`, data)
}

export const deleteService = async (id: string): Promise<void> => {
  return apiClient.delete(`/services/${id}`)
}

// Bookings
export const getBookings = async (filters?: any): Promise<Booking[]> => {
  const query = new URLSearchParams(filters).toString()
  return apiClient.get(`/bookings${query ? '?' + query : ''}`)
}

export const getBookingById = async (id: string): Promise<Booking> => {
  return apiClient.get(`/bookings/${id}`)
}

export const createBooking = async (data: Partial<Booking>): Promise<Booking> => {
  return apiClient.post('/bookings', data)
}

export const updateBooking = async (id: string, data: Partial<Booking>): Promise<Booking> => {
  return apiClient.put(`/bookings/${id}`, data)
}

export const deleteBooking = async (id: string): Promise<void> => {
  return apiClient.delete(`/bookings/${id}`)
}
```

### Paso 3: Actualizar AuthContext

Reemplaza las importaciones en `context/AuthContext.tsx`:

```typescript
// Cambiar
import { loginUser, registerUser } from "@/services/mockServices"

// A
import { loginUser, registerUser, logoutUser } from "@/services/api"
```

### Paso 4: Actualizar DataContext

Actualiza `context/DataContext.tsx` para usar los servicios reales:

```typescript
// services/api.ts
import { 
  getCategories, 
  getServices, 
  getBookings,
  createService,
  updateService,
  deleteService,
  // ... etc
} from "@/services/api"
```

### Paso 5: Configurar Variables de Entorno

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

## 🧪 Testing de Integración

### Opción 1: Usar cURL

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass","role":"client"}'

# Obtener categorías
curl http://localhost:3001/api/categories \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Opción 2: Usar Postman

1. Importa los endpoints documentados arriba
2. Configura variables de entorno (base_url, token)
3. Prueba cada endpoint

### Opción 3: Usar VS Code REST Client

```http
### Variables
@baseUrl = http://localhost:3001/api
@token = YOUR_TOKEN_HERE

### Login
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "client"
}

### Get Categories
GET {{baseUrl}}/categories
Authorization: Bearer {{token}}
```

## ⚠️ Consideraciones Importantes

1. **CORS**: Asegúrate de configurar CORS en tu backend
2. **Validación**: Valida todos los datos en el backend
3. **Errores**: Implementa manejo consistente de errores
4. **Seguridad**: 
   - Nunca almacenes contraseñas en el cliente
   - Usa HTTPS en producción
   - Implement rate limiting
   - Valida permisos en el backend
5. **Performance**:
   - Implementa paginación para grandes conjuntos de datos
   - Cachea datos cuando sea apropiado
   - Optimiza queries de base de datos

## 🔄 Flujos de Negocio

### Flujo de Autenticación

1. Usuario ingresa email y contraseña
2. Frontend envía POST a `/auth/login`
3. Backend valida y devuelve token JWT
4. Frontend almacena token en localStorage
5. Token se envía en headers de autorización

### Flujo de Reserva

1. Cliente busca servicios
2. Cliente selecciona servicio y fecha/hora
3. Frontend POST a `/bookings` con datos
4. Backend crea reserva con estado "pending"
5. Proveedor recibe notificación
6. Proveedor confirma o rechaza
7. Cliente recibe actualización de estado

## 📞 Soporte

Si encuentras problemas durante la integración:

1. Verifica que el backend esté ejecutándose
2. Comprueba la URL de la API en `.env.local`
3. Revisa los logs del navegador (F12 → Console)
4. Revisa los logs del backend
5. Verifica que los tokens sean válidos

---

**Nota**: Esta guía asume un backend REST. Si usas GraphQL u otra API, los pasos pueden variar.
