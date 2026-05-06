"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import type { Category, Service, Booking, DataState } from "@/types";
import {
  getActiveCategories,
  getActiveServices,
  getBookings as fetchBookings,
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory,
  createService as apiCreateService,
  updateService as apiUpdateService,
} from "@/services/api-services";

type DataAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_CATEGORIES"; payload: Category[] }
  | { type: "ADD_CATEGORY"; payload: Category }
  | { type: "UPDATE_CATEGORY"; payload: Category }
  | { type: "TOGGLE_CATEGORY"; payload: string }
  | { type: "SET_SERVICES"; payload: Service[] }
  | { type: "ADD_SERVICE"; payload: Service }
  | { type: "UPDATE_SERVICE"; payload: Service }
  | { type: "TOGGLE_SERVICE"; payload: string }
  | { type: "SET_BOOKINGS"; payload: Booking[] }
  | { type: "ADD_BOOKING"; payload: Booking };

const initialState: DataState = {
  categories: [],
  services: [],
  bookings: [],
  isLoading: false,
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCategory(cat: any): Category {
  return {
    id: String(cat.id ?? cat.idCategoria ?? ""),
    name: cat.nombreCategoria ?? cat.nombre ?? cat.name ?? "",
    description: cat.descripcion ?? cat.description ?? "",
    icon: cat.icono ?? cat.icon ?? "grid",
    accentColor: cat.color ?? cat.accentColor ?? "#22543D",
    isActive: cat.activa ?? cat.activo ?? cat.isActive ?? true,
    createdAt: cat.fechaCreacion ?? cat.createdAt ?? "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapService(svc: any): Service {
  return {
    id: String(svc.id ?? svc.idServicio ?? ""),
    name: svc.nombre ?? svc.name ?? "",
    description: svc.descripcion ?? svc.description ?? "",
    categoryId: String(svc.idCategoria ?? svc.categoryId ?? ""),
    providerId: String(svc.idProveedor ?? svc.providerId ?? ""),
    price: svc.precio ?? svc.price ?? 0,
    duration: svc.duracion ?? svc.duration ?? 60,
    modality: svc.modalidad ?? svc.modality ?? "presencial",
    image: svc.imagen ?? svc.image,
    isActive: svc.activo ?? svc.isActive ?? true,
    createdAt: svc.fechaCreacion ?? svc.createdAt ?? "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBooking(b: any): Booking {
  return {
    id: String(b.id ?? b.idReserva),
    serviceId: String(b.idServicio ?? b.serviceId),
    clientId: String(b.idCliente ?? b.clientId),
    providerId: String(b.idProveedor ?? b.providerId),
    date: b.fecha ?? b.date ?? "",
    time: b.hora ?? b.time ?? "",
    status: b.estado ?? b.status ?? "pending",
    createdAt: b.fechaCreacion ?? b.createdAt ?? "",
  };
}

function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload, isLoading: false };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case "TOGGLE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.payload ? { ...c, isActive: !c.isActive } : c
        ),
      };
    case "SET_SERVICES":
      return { ...state, services: action.payload, isLoading: false };
    case "ADD_SERVICE":
      return {
        ...state,
        services: [...state.services, action.payload],
      };
    case "UPDATE_SERVICE":
      return {
        ...state,
        services: state.services.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case "TOGGLE_SERVICE":
      return {
        ...state,
        services: state.services.map((s) =>
          s.id === action.payload ? { ...s, isActive: !s.isActive } : s
        ),
      };
    case "SET_BOOKINGS":
      return { ...state, bookings: action.payload, isLoading: false };
    case "ADD_BOOKING":
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };
    default:
      return state;
  }
}

interface DataContextType extends DataState {
  loadCategories: () => Promise<void>;
  loadServices: () => Promise<void>;
  loadBookings: () => Promise<void>;
  addCategory: (category: Omit<Category, "id" | "createdAt">) => Promise<void>;
  editCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  toggleCategory: (id: string) => void;
  addService: (service: Omit<Service, "id" | "createdAt">) => Promise<void>;
  editService: (id: string, updates: Partial<Service>) => Promise<void>;
  toggleService: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const loadCategories = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await getActiveCategories();
      const categories = Array.isArray(data) ? data.map(mapCategory) : [];
      dispatch({ type: "SET_CATEGORIES", payload: categories });
    } catch {
      dispatch({ type: "SET_CATEGORIES", payload: [] });
    }
  }, []);

  const loadServices = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await getActiveServices();
      console.log("Services from backend:", data); // temporal
      const services = Array.isArray(data) ? data.map(mapService) : [];
      dispatch({ type: "SET_SERVICES", payload: services });
    } catch {
      dispatch({ type: "SET_SERVICES", payload: [] });
    }
  }, []);

  const loadBookings = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await fetchBookings();
      const bookings = Array.isArray(data) ? data.map(mapBooking) : [];
      dispatch({ type: "SET_BOOKINGS", payload: bookings });
    } catch {
      dispatch({ type: "SET_BOOKINGS", payload: [] });
    }
  }, []);

  const addCategory = useCallback(
    async (category: Omit<Category, "id" | "createdAt">) => {
      const newCategory = await apiCreateCategory(category);
      dispatch({ type: "ADD_CATEGORY", payload: newCategory });
    },
    []
  );

  const editCategory = useCallback(
    async (id: string, updates: Partial<Category>) => {
      const updated = await apiUpdateCategory(id, updates);
      if (updated) {
        dispatch({ type: "UPDATE_CATEGORY", payload: updated });
      }
    },
    []
  );

  const toggleCategory = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_CATEGORY", payload: id });
  }, []);

  const addService = useCallback(
  async (service: Omit<Service, "id" | "createdAt">) => {
    const backendData = {
      nombreServicio: service.name,
      descripcion: service.description,
      idCategoria: service.categoryId,
      precio: service.price,
      duracionMinutos: service.duration,
      modalidad: service.modality.toUpperCase(),
      capacidadMaxima: 10, // valor por defecto
      activo: service.isActive,
    };
    const newService = await apiCreateService(backendData);
    dispatch({ type: "ADD_SERVICE", payload: mapService(newService) });
  },
  []
);

  const editService = useCallback(
  async (id: string, updates: Partial<Service>) => {
    const backendData = {
      nombreServicio: updates.name,
      descripcion: updates.description,
      idCategoria: updates.categoryId,
      precio: updates.price,
      duracionMinutos: updates.duration,
      modalidad: updates.modality?.toUpperCase(),
      capacidadMaxima: 10,
    };
    const updated = await apiUpdateService(id, backendData);
    if (updated) {
      dispatch({ type: "UPDATE_SERVICE", payload: mapService(updated) });
    }
  },
  []
);

  const toggleService = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_SERVICE", payload: id });
  }, []);

  return (
    <DataContext.Provider
      value={{
        ...state,
        loadCategories,
        loadServices,
        loadBookings,
        addCategory,
        editCategory,
        toggleCategory,
        addService,
        editService,
        toggleService,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
