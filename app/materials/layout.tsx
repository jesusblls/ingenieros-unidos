import Sidebar from "../components/sidebar/Sidebar";
import Search from "./components/Search";
import MaterialList from "./components/MaterialList";
import AddButton from "./components/AddButton";
import getCurrentUser from "../actions/getCurrentUser";

export default async function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div
        className="
        px-4 
        py-10
        sm:px-6 
        lg:px-8 
        lg:py-6 
        h-full
        bg-gray-100
      "
      >
        {/* Añadir input de barra de busqueda */}
        <div className="flex">
          <Search />
        </div>
        {/* Container de cards de productos/materiales */}
        <MaterialList currentUser={currentUser!} />
        {/* Button */}
        <AddButton />
      </div>
    </Sidebar>
  );
}
