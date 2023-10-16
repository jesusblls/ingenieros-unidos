import Link from "next/link";
import Sidebar from "../components/sidebar/Sidebar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="hidden md:block absolute items-center z-10 justify-center px-4 ">
        <h1 className="text-5xl font-bold text-white">Bienvenido a</h1>
        <h2 className="text-2xl font-bold text-white">Ingenieros Unidos</h2>
      </div>
      <div
        className="flex flex-col md:flex-row w-full pb-12"
        style={{
          height: "100svh",
        }}
      >
        <div
          className="md:w-1/2 h-1/2 md:h-screen flex items-center justify-center relative group"
          style={{
            backgroundImage:
              "url('https://chengzhizhao.com/wp-content/uploads/2023/02/susan-q-yin-2JIvboGLeho-unsplash-1024x683.jpg')",
            backgroundSize: "cover",
          }}
        >
          <Link href="/materials?type=didactic">
            <h1 className="text-2xl md:text-5xl font-bold text-white z-10 relative text-center">
              Material Didáctico
            </h1>
          </Link>
          <div className="absolute inset-0 bg-black opacity-50 z-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        </div>
        <div
          className="md:w-1/2 h-1/2 md:h-screen flex items-center justify-center relative group"
          style={{
            backgroundImage:
              "url('https://images.alphacoders.com/105/1056771.jpg')",
            backgroundSize: "cover",
          }}
        >
          <Link href="/materials?type=electronic">
            <h1 className="text-2xl md:text-5xl font-bold text-white z-10 relative text-center">
              Material Electrónico
            </h1>
          </Link>
          <div className="absolute inset-0 bg-black opacity-50 z-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        </div>
      </div>
    </Sidebar>
  );
}
