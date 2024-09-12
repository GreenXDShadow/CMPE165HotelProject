import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import RootLayout from "./layout";
import './main.css';

export default function Home() {
  return (
      <div className="main">
        <h1>Hotel App</h1>
        <p>CS-149 Project</p>
        <div className="main-buttons">
          <a href="/pages/login">
            <button className="button">
              Login
            </button>
          </a>
          <a href="/pages/registration">
            <button className="button">
              Register
            </button>
          </a>
          <a href="/pages/payment">
            <button className="button">
              Payment
            </button>
          </a>
        </div>
      </div>
  );
}