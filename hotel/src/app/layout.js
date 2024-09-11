import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LikeHome",
  description: "Your next stay will feel LikeHome",
};

export default function RootLayout({ children, hideNavbar }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          {!hideNavbar && (
            <nav className="nav-container">
              <ul>
                <li>
                  <a className="nav-button" href="/">Home</a>
                </li>
                <li>
                  <a className="nav-button" href="/pages/login">Login</a>
                </li>
                <li>
                  <a className="nav-button" href="/pages/registration">Register</a>
                </li>
                <li>
                  <a className="nav-button" href="/pages/payment">Payment</a>
                </li>
              </ul>
            </nav>
          )}
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}