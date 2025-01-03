export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  clientType: string;
}

export const clients: Client[] = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "123-456-7890",
    city: "Madrid",
    clientType: "Premium",
  },
  {
    id: 2,
    name: "María García",
    email: "maria@example.com",
    phone: "098-765-4321",
    city: "Barcelona",
    clientType: "Standard",
  },
  {
    id: 3,
    name: "Carlos López",
    email: "carlos@example.com",
    phone: "111-222-3333",
    city: "Valencia",
    clientType: "Premium",
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana@example.com",
    phone: "444-555-6666",
    city: "Sevilla",
    clientType: "Standard",
  },
  {
    id: 5,
    name: "Pedro Sánchez",
    email: "pedro@example.com",
    phone: "777-888-9999",
    city: "Bilbao",
    clientType: "Premium",
  },
  {
    id: 6,
    name: "Laura Rodríguez",
    email: "laura@exaple.com",
    phone: "123-456-7890",
    city: "Madrid",
    clientType: "Premium",
  },
  {
    id: 7,
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "123-456-7890",
    city: "Madrid",
    clientType: "Premium",
  },
];
