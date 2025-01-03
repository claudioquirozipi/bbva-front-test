import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Definir el tipo para un cliente
type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  clientType: string;
};

// Datos de ejemplo
const clients: Client[] = [
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
  // Añade más clientes aquí para probar la paginación
];

export default function ClientPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  // Filtrar clientes basado en el término de búsqueda
  const filteredClients = clients.filter((client) =>
    Object.values(client).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calcular el total de páginas
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  // Obtener los clientes para la página actual
  const currentClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tabla de Clientes</h1>

      {/* Barra de búsqueda */}
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Buscar clientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button onClick={() => setSearchTerm("")}>Limpiar</Button>
      </div>

      {/* Tabla de clientes */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Tipo de Cliente</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.city}</TableCell>
              <TableCell>{client.clientType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginación */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              //   disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              //   disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
