import { Providers } from "@/redux/providers";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-white">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
