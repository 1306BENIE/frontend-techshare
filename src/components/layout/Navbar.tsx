import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-2 sm:px-4 py-3 md:py-4">
        <div className="flex items-center gap-2">
          <span className="font-['Poppins'] font-extrabold text-2xl text-primary tracking-tight">
            TechShare
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/home"
            className="text-primary font-semibold hover:text-accent transition-colors"
          >
            Accueil
          </Link>
          <Link
            to="/tools"
            className="text-primary font-semibold hover:text-accent transition-colors"
          >
            Outils
          </Link>
          <Link
            to="#why"
            className="text-primary font-semibold hover:text-accent transition-colors"
          >
            Comment ça marche
          </Link>
          <Link
            to="/auth/login"
            className="px-4 py-2 rounded-xl font-semibold bg-[#c4e9ff1c] text-primary border border-primary shadow-sm hover:bg-primary hover:text-primmary hover:shadow-lg transition-all duration-200 max-w-xs mx-auto sm:mx-0 sm:w-auto"
          >
            Connexion
          </Link>
        </div>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-primary/10"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <Menu className="w-7 h-7 text-primary" />
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col gap-2 px-2 py-3">
            <Link
              to="/home"
              className="text-primary font-semibold hover:text-accent"
              onClick={() => setMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/tools"
              className="text-primary font-semibold hover:text-accent"
              onClick={() => setMenuOpen(false)}
            >
              Outils
            </Link>
            <Link
              to="#why"
              className="text-primary font-semibold hover:text-accent"
              onClick={() => setMenuOpen(false)}
            >
              Comment ça marche
            </Link>
            <Link
              to="/auth/login"
              className="font-semibold bg-white text-primary border border-primary rounded-xl px-4 py-2 mt-1 shadow-sm hover:bg-primary hover:text-white hover:shadow-lg transition-all duration-200 max-w-xs self-start"
              onClick={() => setMenuOpen(false)}
            >
              Connexion
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
