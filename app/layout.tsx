import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import MySessionProvider from "./_components/MySessionProvider/MySessionProvider";
import { CartProvider } from "./context/CartContext";
import Navbar from "./_components/navbar/page";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import Footer from './_components/footer/page';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MySessionProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </CartProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}
