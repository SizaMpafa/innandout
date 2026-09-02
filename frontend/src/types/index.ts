export interface Service {
  id: string;
  name: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  image: string;
}

export type BookingStatus = 'Pending' | 'Confirmed';

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  location: string;
  details: string;
  status: BookingStatus;
  createdAt: string;
}
