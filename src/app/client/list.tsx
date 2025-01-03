import { cx } from "class-variance-authority";
import { Edit, Delete } from "lucide-react";
import { useState } from "react";

import useClientContext from "@/context/client-context";

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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ClientPage() {
  const { clients, setClients } = useClientContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const filteredClients = clients.filter((client) =>
    Object.values(client).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Tipo de Cliente</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.city}</TableCell>
              <TableCell>
                <Badge
                  className={cx({
                    "bg-green-500": client.clientType === "Premium",
                    "bg-blue-500": client.clientType === "Standard",
                  })}
                >
                  {client.clientType}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  className="bg-orange-500"
                  onClick={() => {
                    console.log(client.id);
                    // history.push(`/client/edit/${client.id}`);
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  className="ml-2 bg-red-500"
                  onClick={() => {
                    setClients((prev) =>
                      prev.filter((item) => item.id !== client.id)
                    );
                  }}
                >
                  <Delete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              // disabled={currentPage === 1}
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
