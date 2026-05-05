# Página de Reservas - Frontend

Un sistema moderno de gestión y reserva de servicios construido con Next.js 16, TypeScript y componentes de UI de Radix.

## 📋 Contenido del Proyecto

### Características Principales

- **Sistema de Autenticación**: Login y registro con soporte para múltiples roles (Cliente, Proveedor, Admin)
- **Dashboard Interactivo**: Interfaz completa para gestión de servicios y reservas
- **Gestión de Servicios**: Crear, editar y visualizar servicios
- **Gestión de Categorías**: Organización de servicios por categorías
- **Gestión de Reservas**: Sistema completo de reservación con estados (pendiente, confirmada, completada, cancelada)
- **Sistema de Temas**: Selector de colores y personalización visual
- **Componentes UI Modernos**: Biblioteca completa de componentes reutilizables basada en Radix UI

## 🚀 Requisitos Previos

- Node.js 18.x o superior
- pnpm 8.x o superior (o npm/yarn como alternativa)
- Git

## 📦 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd Pagina-Reservas
```

### 2. Instalar Dependencias

```bash
pnpm install
```

O si utilizas npm:
```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

# Autenticación
NEXT_PUBLIC_AUTH_ENABLED=true

# Analytics (opcional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

### 4. Ejecutar el Proyecto en Desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

### 5. Construir para Producción

```bash
pnpm build
pnpm start
```

## 📁 Estructura del Proyecto

```
Pagina-Reservas/
├── app/                           # Rutas y páginas de Next.js
│   ├── (auth)/                    # Rutas públicas de autenticación
│   │   ├── login/                 # Página de login
│   │   └── register/              # Página de registro
│   ├── (dashboard)/               # Rutas protegidas del dashboard
│   │   ├── categories/            # Gestión de categorías
│   │   ├── services/              # Gestión de servicios
│   │   ├── my-bookings/           # Mis reservas
│   │   └── dashboard/             # Panel principal
│   ├── layout.tsx                 # Layout principal
│   └── page.tsx                   # Página de inicio (redirige a login)
│
├── components/                    # Componentes React
│   ├── ui/                        # Componentes UI reutilizables (Radix UI)
│   ├── layout/                    # Componentes de layout
│   │   ├── DashboardLayout.tsx    # Layout principal del dashboard
│   │   ├── Sidebar.tsx            # Sidebar de navegación
│   │   ├── TopBar.tsx             # Barra superior
│   │   └── SplitScreenLayout.tsx  # Layout de pantalla dividida
│   ├── pages/                     # Componentes de páginas complejas
│   ├── IconPicker.tsx             # Selector de iconos
│   ├── ColorSwatch.tsx            # Selector de colores
│   ├── ServiceDrawer.tsx          # Drawer para servicios
│   └── theme-provider.tsx         # Proveedor de tema
│
├── context/                       # Context API para estado global
│   ├── AuthContext.tsx            # Autenticación y usuario
│   └── DataContext.tsx            # Gestión de datos globales
│
├── hooks/                         # Custom hooks
│   ├── use-mobile.ts              # Detectar dispositivo móvil
│   └── use-toast.ts               # Notificaciones toast
│
├── lib/                           # Utilidades y funciones auxiliares
│   └── utils.ts                   # Funciones de utilidad
│
├── services/                      # Servicios de API (actualmente mock)
│   └── mockServices.ts            # Funciones mock de servicios
│
├── data/                          # Datos estáticos y mock
│   └── mockData.ts                # Datos mock de ejemplo
│
├── types/                         # Tipos TypeScript
│   └── index.ts                   # Definiciones de tipos principales
│
├── styles/                        # Estilos globales
│   └── globals.css                # Estilos CSS globales
│
├── public/                        # Archivos estáticos
│
├── next.config.mjs                # Configuración de Next.js
├── tsconfig.json                  # Configuración de TypeScript
├── postcss.config.mjs             # Configuración de PostCSS
└── package.json                   # Dependencias del proyecto
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
pnpm dev                # Inicia servidor de desarrollo en http://localhost:3000

# Producción
pnpm build              # Construye la aplicación para producción
pnpm start              # Inicia servidor de producción

# Linting
pnpm lint               # Verifica problemas de código con ESLint
```

## 📊 Tipos de Datos Principales

### User (Usuario)
```typescript
interface User {
  id: string
  email: string
  name: string
  lastName: string
  role: "client" | "provider" | "admin"
  phone?: string
  businessName?: string      // Para proveedores
  documentId?: string        // Cédula o RIF
  avatar?: string
}
```

### Service (Servicio)
```typescript
interface Service {
  id: string
  name: string
  description: string
  categoryId: string
  providerId: string
  price: number
  duration: number           // En minutos
  modality: "presencial" | "virtual"
  image?: string
  isActive: boolean
  createdAt: string
}
```

### Booking (Reserva)
```typescript
interface Booking {
  id: string
  serviceId: string
  clientId: string
  providerId: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
}
```

### Category (Categoría)
```typescript
interface Category {
  id: string
  name: string
  description: string
  icon: string
  accentColor: string
  isActive: boolean
  createdAt: string
}
```

## 🔗 Integración con Backend

### Paso 1: Reemplazar Servicios Mock

Los servicios actuales en `services/mockServices.ts` deben ser reemplazados por llamadas reales a la API.

**Ubicación actual de mocks:**
- `services/mockServices.ts` - Funciones de autenticación y datos
- `data/mockData.ts` - Datos estáticos

### Paso 2: Configurar Variables de Entorno

Actualiza `.env.local` con la URL de tu backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### Paso 3: Crear Cliente API

Crea un nuevo archivo `lib/api-client.ts` para centralizar las llamadas HTTP:

```typescript
// lib/api-client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const apiClient = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    
    return response.json()
  },

  get(endpoint: string) {
    return this.fetch(endpoint)
  },

  post(endpoint: string, data: any) {
    return this.fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  put(endpoint: string, data: any) {
    return this.fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete(endpoint: string) {
    return this.fetch(endpoint, { method: 'DELETE' })
  },
}
```

### Paso 4: Actualizar Funciones de Servicio

Reemplaza las funciones en `services/mockServices.ts`:

```typescript
// services/api.ts (nuevo archivo)
import { apiClient } from '@/lib/api-client'
import type { User, Category, Service, Booking } from '@/types'

// Auth
export const loginUser = async (
  email: string,
  password: string,
  role: string
): Promise<User> => {
  return apiClient.post('/auth/login', { email, password, role })
}

export const registerUser = async (userData: Partial<User>): Promise<User> => {
  return apiClient.post('/auth/register', userData)
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

// Services
export const getServices = async (): Promise<Service[]> => {
  return apiClient.get('/services')
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

// Bookings
export const getBookings = async (): Promise<Booking[]> => {
  return apiClient.get('/bookings')
}

export const createBooking = async (data: Partial<Booking>): Promise<Booking> => {
  return apiClient.post('/bookings', data)
}

export const updateBooking = async (id: string, data: Partial<Booking>): Promise<Booking> => {
  return apiClient.put(`/bookings/${id}`, data)
}
```

### Paso 5: Actualizar AuthContext

Modifica `context/AuthContext.tsx` para usar la API real:

```typescript
// Actualizar las importaciones
import { loginUser, registerUser } from '@/services/api'

// El resto del contexto se mantendrá igual
```

### Paso 6: Añadir Autenticación por Token

Si tu backend usa JWT, actualiza el cliente API:

```typescript
// lib/api-client.ts
export const apiClient = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const token = localStorage.getItem('authToken')
    
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
    
    if (response.status === 401) {
      // Redirigir a login si no autorizado
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    
    return response.json()
  },
  // ... resto del código
}
```

### Paso 7: Endpoints Esperados del Backend

Tu backend debe proporcionar los siguientes endpoints:

**Autenticación:**
- `POST /auth/login` - Login de usuario
- `POST /auth/register` - Registro de usuario
- `POST /auth/logout` - Logout

**Categorías:**
- `GET /categories` - Obtener todas las categorías
- `GET /categories/:id` - Obtener categoría por ID
- `POST /categories` - Crear categoría
- `PUT /categories/:id` - Actualizar categoría
- `DELETE /categories/:id` - Eliminar categoría

**Servicios:**
- `GET /services` - Obtener todos los servicios
- `GET /services/:id` - Obtener servicio por ID
- `POST /services` - Crear servicio
- `PUT /services/:id` - Actualizar servicio
- `DELETE /services/:id` - Eliminar servicio

**Reservas:**
- `GET /bookings` - Obtener todas las reservas
- `GET /bookings/:id` - Obtener reserva por ID
- `POST /bookings` - Crear reserva
- `PUT /bookings/:id` - Actualizar reserva
- `DELETE /bookings/:id` - Eliminar reserva

## 🎨 Componentes UI Disponibles

El proyecto incluye una biblioteca completa de componentes de UI basados en Radix UI:

- Accordions, Alerts, Avatars
- Badges, Breadcrumbs, Buttons
- Cards, Carousels, Checkboxes
- Dialogs, Drawers, Dropdowns
- Forms, Input Groups, Labels
- Menus, Modals, Popvers
- Progress Bars, Radio Groups, Select
- Sheets, Sidebars, Sliders
- Tables, Tabs, Textareas
- Toggles, Tooltips, Toast Notifications

## 🔐 Autenticación y Roles

El sistema soporta tres roles de usuario:

1. **Client** (Cliente): Puede buscar servicios y realizar reservas
2. **Provider** (Proveedor): Puede crear y gestionar servicios
3. **Admin** (Administrador): Acceso completo al sistema

El contexto de autenticación gestiona el flujo de login/logout y mantiene la información del usuario en el estado global.

## 🚦 Estados de Reserva

Las reservas pueden tener los siguientes estados:

- **pending**: Reserva pendiente de confirmación
- **confirmed**: Reserva confirmada
- **completed**: Servicio completado
- **cancelled**: Reserva cancelada

## 💻 Desarrollo

### Agregar una Nueva Página

1. Crea una carpeta en `app/(dashboard)/` o `app/(auth)/`
2. Agrega un archivo `page.tsx`
3. Usa los componentes de layout disponibles

### Agregar un Nuevo Componente

1. Crea el archivo en `components/`
2. Si es reutilizable, agrégalo en `components/ui/`
3. Exporta desde el archivo principal si es necesario

### Agregar un Nuevo Hook

1. Crea el archivo en `hooks/`
2. Sigue la convención de nombres `use-*`

## 🐛 Troubleshooting

### Error: "Cannot find module"
```bash
pnpm install
```

### Puerto 3000 ya está en uso
```bash
pnpm dev -p 3001
```

### Problemas con TypeScript
```bash
pnpm build
```

## 📝 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL base de la API | `http://localhost:3001` |
| `NEXT_PUBLIC_API_BASE_URL` | URL de endpoints de API | `http://localhost:3001/api` |
| `NEXT_PUBLIC_AUTH_ENABLED` | Habilitar autenticación | `true` |

## 📦 Dependencias Principales

- **Next.js 16.2.4**: Framework React con SSR
- **React 19**: Librería UI
- **TypeScript**: Lenguaje tipado
- **Radix UI**: Componentes accesibles
- **Framer Motion**: Animaciones
- **React Hook Form**: Gestión de formularios
- **Zod**: Validación de esquemas
- **Lucide React**: Iconos
- **Date-fns**: Utilidades de fechas
- **Tailwind CSS**: Estilos utility-first

## 🤝 Próximos Pasos

1. **Conectar Backend Real**: Reemplazar todos los servicios mock
2. **Implementar Autenticación Segura**: Usar JWT o sesiones
3. **Agregar Validaciones**: Validar datos en el frontend y backend
4. **Testing**: Agregar tests unitarios e integración
5. **Deployment**: Configurar CI/CD y desplegar en producción

## 📄 Licencia

Este proyecto es de propiedad privada. Todos los derechos reservados.

---

**Última actualización**: Mayo 2026

Para más información o soporte, contacta al equipo de desarrollo.
