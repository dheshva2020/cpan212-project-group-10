
import { Geist, Geist_Mono } from "next/font/google";
import { RecipeProvider } from "../context/RecipeContext";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Recipe & Meal Planner",
  description: "Plan meals and search for recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <RecipeProvider>
          <header style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
            <nav style={{ display: "flex", gap: "20px" }}>
              <Link href="/">Home</Link>
              <Link href="/meal-plans">Meal Plans</Link>
              <Link href="/meal-plans/new">Create Meal Plan</Link>
              <Link href="/recipes">Search Recipes</Link>
            </nav>
          </header>
          {children}
        </RecipeProvider>
      </body>
    </html>
  );
}
