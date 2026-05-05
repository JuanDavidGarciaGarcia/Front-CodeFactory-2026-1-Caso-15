const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const apiClient = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    }

    const response = await fetch(url, { ...options, headers })

    if (response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken")
        window.location.href = "/login"
      }
    }

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}))
      throw new Error(errorBody?.message ?? response.statusText)
    }

    return response.json()
  },

  get(endpoint: string) {
    return this.fetch(endpoint)
  },

  post(endpoint: string, data: unknown) {
    return this.fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  put(endpoint: string, data: unknown) {
    return this.fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  delete(endpoint: string) {
    return this.fetch(endpoint, { method: "DELETE" })
  },
}