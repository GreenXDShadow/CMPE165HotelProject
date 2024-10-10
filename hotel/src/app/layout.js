import { Inter } from "next/font/google";
import "./main.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LikeHome",
  description: "Your next stay will feel LikeHome",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <header>
          <nav className="nav-container">
            <a href="/">
              <img src="/home.png" alt="Home Logo" className="nav-logo" />
            </a>
            <ul>
              <li><a className="nav-button" href="/">Home</a></li>
              <li><a className="nav-button" href="/login">Login</a></li>
              <li><a className="nav-button" href="/registration">Register</a></li>
              <li><a className="nav-button" href="/payment">Payment</a></li>
            </ul>
          </nav>
        </header>
        <main style={{ minHeight: "100vh" }}>{children}</main>
      </body>
    </html>
  );
}
