import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Booking, Project, Service } from '../types';
import {
  generateId,
  getBookings,
  getProjects,
  getServices,
  saveBookings,
  saveProjects,
  saveServices,
} from '../lib/storage';

interface AppContextValue {
  services: Service[];
  projects: Project[];
  bookings: Booking[];
  addService: (name: string, description: string) => void;
  removeService: (id: string) => void;
  addProject: (title: string, location: string, image: string) => void;
  removeProject: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void;
  confirmBooking: (id: string) => void;
  removeBooking: (id: string) => void;
  clearBookings: () => void;
  refresh: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const refresh = useCallback(() => {
    setServices(getServices());
    setProjects(getProjects());
    setBookings(getBookings());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addService = useCallback((name: string, description: string) => {
    setServices((prev) => {
      const next = [{ id: generateId('svc'), name, description }, ...prev];
      saveServices(next);
      return next;
    });
  }, []);

  const removeService = useCallback((id: string) => {
    setServices((prev) => {
      const next = prev.filter((s) => s.id !== id);
      saveServices(next);
      return next;
    });
  }, []);

  const addProject = useCallback((title: string, location: string, image: string) => {
    setProjects((prev) => {
      const next = [{ id: generateId('proj'), title, location, image }, ...prev];
      saveProjects(next);
      return next;
    });
  }, []);

  const removeProject = useCallback((id: string) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id);
      saveProjects(next);
      return next;
    });
  }, []);

  const addBooking = useCallback(
    (data: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
      const booking: Booking = {
        ...data,
        id: generateId('bk'),
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      setBookings((prev) => {
        const next = [booking, ...prev];
        saveBookings(next);
        return next;
      });
    },
    []
  );

  const confirmBooking = useCallback((id: string) => {
    setBookings((prev) => {
      const next = prev.map((b) =>
        b.id === id ? { ...b, status: 'Confirmed' as const } : b
      );
      saveBookings(next);
      return next;
    });
  }, []);

  const removeBooking = useCallback((id: string) => {
    setBookings((prev) => {
      const next = prev.filter((b) => b.id !== id);
      saveBookings(next);
      return next;
    });
  }, []);

  const clearBookings = useCallback(() => {
    setBookings([]);
    saveBookings([]);
  }, []);

  const value = useMemo(
    () => ({
      services,
      projects,
      bookings,
      addService,
      removeService,
      addProject,
      removeProject,
      addBooking,
      confirmBooking,
      removeBooking,
      clearBookings,
      refresh,
    }),
    [
      services,
      projects,
      bookings,
      addService,
      removeService,
      addProject,
      removeProject,
      addBooking,
      confirmBooking,
      removeBooking,
      clearBookings,
      refresh,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
}
