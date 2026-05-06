const URLS = {
  auth: process.env.NEXT_PUBLIC_AUTH_URL,
  catalog: process.env.NEXT_PUBLIC_CATALOG_URL,
  schedule: process.env.NEXT_PUBLIC_SCHEDULE_URL,
  reservation: process.env.NEXT_PUBLIC_RESERVATION_URL,
}

type ServiceName = keyof typeof URLS

function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("authToken") : null
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken")
  if (!refreshToken) return null

  try {
    const response = await fetch(`${URLS.auth}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) return null

    const data = await response.json()
    if (data.accessToken) {
      localStorage.setItem("authToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      return data.accessToken
    }
    return null
  } catch {
    return null
  }
}

async function apiFetch(service: ServiceName, endpoint: string, options: RequestInit = {}, retry = true) {
  const url = `${URLS[service]}${endpoint}`
  const token = getToken()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(url, { ...options, headers })

  if (response.status === 401 && retry) {
    // Intentar refrescar el token
    const newToken = await refreshAccessToken()
    if (newToken) {
      // Reintentar con el nuevo token
      return apiFetch(service, endpoint, options, false)
    }
    // Si no se pudo refrescar, redirigir al login
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken")
      localStorage.removeItem("refreshToken")
      window.location.href = "/login"
    }
    throw new Error("Session expired")
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new Error(errorBody?.message ?? response.statusText)
  }

  return response.json()
}

export const apiClient = {
  auth: {
    get: (endpoint: string) => apiFetch("auth", endpoint),
    post: (endpoint: string, data: unknown) => apiFetch("auth", endpoint, { method: "POST", body: JSON.stringify(data) }),
    put: (endpoint: string, data: unknown) => apiFetch("auth", endpoint, { method: "PUT", body: JSON.stringify(data) }),
    delete: (endpoint: string) => apiFetch("auth", endpoint, { method: "DELETE" }),
  },
  catalog: {
    get: (endpoint: string) => apiFetch("catalog", endpoint),
    post: (endpoint: string, data: unknown) => apiFetch("catalog", endpoint, { method: "POST", body: JSON.stringify(data) }),
    put: (endpoint: string, data: unknown) => apiFetch("catalog", endpoint, { method: "PUT", body: JSON.stringify(data) }),
    delete: (endpoint: string) => apiFetch("catalog", endpoint, { method: "DELETE" }),
  },
  schedule: {
    get: (endpoint: string) => apiFetch("schedule", endpoint),
    post: (endpoint: string, data: unknown) => apiFetch("schedule", endpoint, { method: "POST", body: JSON.stringify(data) }),
    put: (endpoint: string, data: unknown) => apiFetch("schedule", endpoint, { method: "PUT", body: JSON.stringify(data) }),
    delete: (endpoint: string) => apiFetch("schedule", endpoint, { method: "DELETE" }),
  },
  reservation: {
    get: (endpoint: string) => apiFetch("reservation", endpoint),
    post: (endpoint: string, data: unknown) => apiFetch("reservation", endpoint, { method: "POST", body: JSON.stringify(data) }),
    put: (endpoint: string, data: unknown) => apiFetch("reservation", endpoint, { method: "PUT", body: JSON.stringify(data) }),
    delete: (endpoint: string) => apiFetch("reservation", endpoint, { method: "DELETE" }),
  },
}