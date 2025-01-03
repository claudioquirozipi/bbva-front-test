import { useParams } from "react-router";

import ClientCreateEditForm from "./components/client-create-edit-form";
import useClientContext from "@/context/client-context";

function EditClientPage() {
  const { id } = useParams<{ id: string }>();
  const { clients } = useClientContext();
  const client = clients.find((client) => client.id === Number(id));
  if (!client) {
    return (
      <div className="flex justify-center mt-20">
        <h1 className="text-2xl font-bold text-gray-800">
          Cliente no encontrado
        </h1>
      </div>
    );
  }
  return (
    <div>
      <ClientCreateEditForm action="edit" client={client} />
    </div>
  );
}

export default EditClientPage;
