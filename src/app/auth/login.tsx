import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type User, users } from "./data/users";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Debe ser un email válido."),
  password: z
    .string()
    .min(4, "La contraseña debe tener al menos 4 caracteres."),
});

export default function LoginPage() {
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    setError(false);
    const user = users.find(
      (u: User) => u.email === data.email && u.password === data.password
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      localStorage.setItem("token", "bearer token");
      navigate("/");
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Iniciar Sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <Input
                id="email"
                placeholder="tu@ejemplo.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
        {error && (
          <CardFooter>
            <p className="w-full text-center bg-red-100 text-red-500 text-xs p-2 rounded">
              Usuario o contraseña incorrectos.
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
