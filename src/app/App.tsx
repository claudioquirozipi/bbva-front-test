import { BrowserRouter, Routes, Route } from "react-router";

import { ClientProvider } from "@/context/client-context";
import CreateClientPage from "./client/create";
import EditClientPage from "./client/edit";
import ClientPage from "./client/list";
import LoginPage from "./auth/login";
import Layout from "./layout";

function App() {
  return (
    <ClientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<h1>home</h1>} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/client/create" element={<CreateClientPage />} />
            <Route path="/client/edit/:id" element={<EditClientPage />} />
            <Route path="/setting" element={<h1>settings</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ClientProvider>
  );
}

export default App;
