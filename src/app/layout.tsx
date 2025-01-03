import { Home, UserPlus, Users, Settings, LogOut, Menu } from "lucide-react";
import { Outlet, Link } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function Layout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const navItems = [
    { name: "Inicio", href: "/", icon: <Home className="h-5 w-5" /> },
    {
      name: "Nuevo Cliente",
      href: "/client/create",
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      name: "Consultar Clientes",
      href: "/client",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Configuración",
      href: "/setting",
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr,auto]">
      <header className="border-b bg-gray-800 text-white">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="text-lg font-bold">Sistema de clientes</div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Sistema de clientes</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col space-y-4 p-4">
                {navItems.map((item) => (
                  <Link
                    onClick={() => setOpen(false)}
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-2 hover:text-blue-500"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
                <Button
                  className="bg-red-500 text-white flex items-center space-x-2"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/auth/login");
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Cerrar Sesión</span>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <div className="flex justify-center items-center h-16 bg-gray-800 text-white">
        <p>
          Desarrollado por <span>Claudio Quiroz</span>
        </p>
      </div>
    </div>
  );
}

export default Layout;
