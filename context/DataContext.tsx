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
  getCategories as fetchCategories,
  getServices as fetchServices,
  getBookings as fetchBookings,
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory,
  createService as apiCreateService,
  updateService as apiUpdateService,
} from "@/services/mockServices";

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
    const categories = await fetchCategories();
    dispatch({ type: "SET_CATEGORIES", payload: categories });
  }, []);

  const loadServices = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const services = await fetchServices();
    dispatch({ type: "SET_SERVICES", payload: services });
  }, []);

  const loadBookings = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const bookings = await fetchBookings();
    dispatch({ type: "SET_BOOKINGS", payload: bookings });
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
      const newService = await apiCreateService(service);
      dispatch({ type: "ADD_SERVICE", payload: newService });
    },
    []
  );

  const editService = useCallback(
    async (id: string, updates: Partial<Service>) => {
      const updated = await apiUpdateService(id, updates);
      if (updated) {
        dispatch({ type: "UPDATE_SERVICE", payload: updated });
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
