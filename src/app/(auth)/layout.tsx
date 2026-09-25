import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import { BootstrapClient } from "../bootstrap-client";
import Navigation from "../../../components/Navigation";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
