import "./globals.css";
import AuthContext from "./context/AuthContext";
import ActiveStatus from "./components/ActiveStatus";
import ToasterContext from "./context/ToasterContext";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "Ingenieros Unidos",
  description: "App para ingenieros",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <CartProvider>
            <ToasterContext />
            <ActiveStatus />
            {children}
          </CartProvider>
        </AuthContext>
      </body>
    </html>
  );
}
