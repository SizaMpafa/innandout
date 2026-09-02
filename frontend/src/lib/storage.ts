import type { Booking, Project, Service } from '../types';

const KEYS = {
  services: 'innandout_services',
  projects: 'innandout_projects',
  bookings: 'innandout_bookings',
  admin: 'innandout_admin',
} as const;

const SEED_SERVICES: Service[] = [
  {
    id: 'svc-1',
    name: 'Plumbing & Drainage',
    description:
      'Leaks, burst pipes, blocked drains, pipe replacements and general plumbing repairs for homes, offices and commercial spaces.',
  },
  {
    id: 'svc-2',
    name: 'Electrical Services',
    description:
      'Lighting, rewiring, fault finding, power points, switches and safe electrical upgrades carried out by qualified professionals.',
  },
  {
    id: 'svc-3',
    name: 'Painting & Tiling',
    description:
      'Interior and exterior painting, tile installation, wall prep and finishing work to upgrade your space with durable results.',
  },
  {
    id: 'svc-4',
    name: 'Renovations & Maintenance',
    description:
      'Kitchen, bathroom and general property renovations, maintenance contracts and ongoing improvements for residential and commercial clients.',
  },
  {
    id: 'svc-5',
    name: 'Geysers & Water Heating',
    description:
      'Installation, repair and maintenance of geysers and water heating systems to keep daily operations reliable and efficient.',
  },
];

const SEED_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Bathroom Full Renovation',
    location: 'Residential • Johannesburg',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'proj-2',
    title: 'Commercial Pipe Replacement',
    location: 'Office Building • Pretoria',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a809f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'proj-3',
    title: 'Emergency Burst Pipe Repair',
    location: 'Residential • Midrand',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
  },
];

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getServices(): Service[] {
  const stored = localStorage.getItem(KEYS.services);
  if (!stored) {
    writeJSON(KEYS.services, SEED_SERVICES);
    return [...SEED_SERVICES];
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : [...SEED_SERVICES];
  } catch {
    return [...SEED_SERVICES];
  }
}

export function saveServices(services: Service[]) {
  writeJSON(KEYS.services, services);
}

export function getProjects(): Project[] {
  const stored = localStorage.getItem(KEYS.projects);
  if (!stored) {
    writeJSON(KEYS.projects, SEED_PROJECTS);
    return [...SEED_PROJECTS];
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : [...SEED_PROJECTS];
  } catch {
    return [...SEED_PROJECTS];
  }
}

export function saveProjects(projects: Project[]) {
  writeJSON(KEYS.projects, projects);
}

export function getBookings(): Booking[] {
  return readJSON<Booking[]>(KEYS.bookings, []);
}

export function saveBookings(bookings: Booking[]) {
  writeJSON(KEYS.bookings, bookings);
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(KEYS.admin) === '1';
}

export function setAdminAuthenticated(value: boolean) {
  if (value) {
    sessionStorage.setItem(KEYS.admin, '1');
  } else {
    sessionStorage.removeItem(KEYS.admin);
  }
}

export function generateId(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Unable to read file'));
    reader.readAsDataURL(file);
  });
}
