# 🚀 Guía de Inicio Rápido

Instrucciones paso a paso para empezar a desarrollar en este proyecto.

## 5 Minutos - Configuración Básica

### 1. Requisitos Previos

- Node.js 18+ instalado
- pnpm, npm o yarn
- Git

Verifica la instalación:
```bash
node --version
pnpm --version  # o npm --version
```

### 2. Clonar y Instalar

```bash
# Clonar repositorio
git clone <repository-url>
cd Pagina-Reservas

# Instalar dependencias
pnpm install
```

### 3. Configurar Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar .env.local con tu editor favorito
# Mínimo requerido: NEXT_PUBLIC_API_BASE_URL
```

### 4. Iniciar Desarrollo

```bash
pnpm dev
```

Abre http://localhost:3000 en tu navegador. ✅ ¡Listo!

## 10 Minutos - Primera Prueba

### Credenciales de Prueba

El proyecto usa datos mock por defecto. Para probar con credenciales reales, ve a [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md).

**Credenciales Demo:**
- Email: `client@example.com`
- Password: `password`
- Rol: `client`

O:
- Email: `provider@example.com`
- Password: `password`
- Rol: `provider`

### Explorando la App

1. **Login**: Inicia sesión con las credenciales de arriba
2. **Dashboard**: Explora los servicios y categorías
3. **Crear Servicio**: Si eres proveedor, crea un nuevo servicio
4. **Hacer Reserva**: Si eres cliente, reserva un servicio

## 20 Minutos - Primeras Modificaciones

### Cambiar el Tema

En [components/theme-provider.tsx](components/theme-provider.tsx):

```typescript
// Cambiar colores del tema
const theme = {
  primaryColor: '#tu-color-aqui',
  // ...
}
```

### Agregar Nueva Página

```bash
# Crear carpeta para nueva página
mkdir app/(dashboard)/nueva-pagina

# Crear archivo de página
echo 'export default function NewPage() { return <h1>Nueva Página</h1> }' > app/(dashboard)/nueva-pagina/page.tsx
```

### Usar Componentes UI

```typescript
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function MyComponent() {
  return (
    <Card>
      <Button>Haz clic</Button>
    </Card>
  )
}
```

## 30 Minutos - Integración Backend

1. Lee [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)
2. Crea cliente API en `lib/api-client.ts`
3. Crea servicios en `services/api.ts`
4. Actualiza `.env.local` con URL del backend
5. Prueba con Postman o cURL

## Estructura Rápida

```
src/
├── app/           → Páginas y rutas
├── components/    → Componentes React
│   └── ui/        → Componentes reutilizables
├── context/       → Estado global
├── hooks/         → Custom hooks
├── lib/           → Utilidades
├── services/      → Llamadas API
├── types/         → Tipos TypeScript
└── styles/        → Estilos CSS
```

## Comandos Útiles

```bash
# Desarrollo
pnpm dev              # Inicia servidor (http://localhost:3000)

# Build & Production
pnpm build            # Compilar para producción
pnpm start            # Ejecutar versión production

# Linting
pnpm lint             # Verificar código

# Limpiar
rm -rf .next node_modules
pnpm install          # Reinstalar desde cero
```

## Debugging

### En VS Code

1. Abre la paleta de comandos: `Ctrl+Shift+D`
2. Selecciona "Next.js"
3. Los breakpoints funcionarán en el código

### En el Navegador

1. Abre DevTools: `F12`
2. Ve a la pestaña "Console"
3. Prueba comandos JavaScript

### Logs

```typescript
// En componentes
console.log('Debug:', data)

// En el servidor
console.log('[SERVER]:', data)
```

## Solución de Problemas

### Error: "Module not found"
```bash
pnpm install
```

### Error: "Port 3000 already in use"
```bash
# Usar otro puerto
pnpm dev -p 3001

# O matar el proceso en el puerto 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error: "Cannot find type"
```bash
# Recompila tipos
pnpm build
```

### Estilos no se ven
Limpia caché:
```bash
rm -rf .next
pnpm dev
```

## Recursos Útiles

- [Documentación Completa](README.md)
- [Integración Backend](BACKEND_INTEGRATION.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Radix UI](https://www.radix-ui.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Próximos Pasos

- [ ] Conectar backend real
- [ ] Configurar autenticación JWT
- [ ] Agregar tests
- [ ] Implementar CI/CD
- [ ] Desplegar a producción

## ¿Necesitas Ayuda?

1. Revisa [README.md](README.md) para documentación completa
2. Revisa [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) para API
3. Busca ejemplos en la carpeta `components/`
4. Abre un issue en el repositorio

---

**Tip**: Abre este archivo en VS Code y usa `Cmd+Shift+V` (Mac) o `Ctrl+Shift+V` (Windows/Linux) para ver la vista previa.

¡Happy Coding! 🎉
