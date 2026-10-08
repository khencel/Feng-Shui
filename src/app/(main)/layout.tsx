import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import { BootstrapClient } from "../bootstrap-client";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Navigation />
          {children}
          <Footer />
        <BootstrapClient />
     </> 
  );
}
