import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";

import useClientContext from "@/context/client-context";
import type { Client } from "../data/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introduce un email válido.",
  }),
  phone: z.string().min(9, {
    message: "El teléfono debe tener al menos 9 dígitos.",
  }),
  city: z.string().min(2, {
    message: "La ciudad debe tener al menos 2 caracteres.",
  }),
  clientType: z.enum(["Premium", "Standard"], {
    required_error: "Por favor, selecciona un tipo de cliente.",
  }),
});

interface ClientCreateEditFormProps {
  action: "create" | "edit";
  client?: Client;
}

export default function ClientCreateEditForm(props: ClientCreateEditFormProps) {
  const { action, client } = props;
  const { setClients } = useClientContext();
  const navigate = useNavigate();
  const defaultValues = client ?? {
    id: 0,
    name: "",
    email: "",
    phone: "",
    city: "",
    clientType: "Premium",
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    if (action === "create") {
      setClients((clients) => [
        ...clients,
        { id: Math.round(Math.random() * 1000), ...values },
      ]);
    }
    if (action === "edit") {
      setClients((clients) =>
        clients.map((c) => (c.id === client?.id ? { ...c, ...values } : c))
      );
    }
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/client");
      form.reset();
    }, 2000);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {action === "create" ? "Crear cliente" : "Editar cliente"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Juan Pérez" {...field} />
                </FormControl>
                <FormDescription>Nombre completo del cliente.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="juan@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Dirección de correo electrónico del cliente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="123456789" {...field} />
                </FormControl>
                <FormDescription>
                  Número de teléfono del cliente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad</FormLabel>
                <FormControl>
                  <Input placeholder="Madrid" {...field} />
                </FormControl>
                <FormDescription>
                  Ciudad de residencia del cliente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Cliente</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo de cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Selecciona el tipo de cliente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? action === "create"
                ? "Creando..."
                : "Actualizando..."
              : action === "create"
              ? "Crear"
              : "Actualizar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
