import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./app/auth/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/client" element={<h1>lista de clientes</h1>} />
        <Route path="/client/create" element={<h1>crear cliente</h1>} />
        <Route
          path="/client/edit/:id"
          element={<h1>editar cliente por el id xxx</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
