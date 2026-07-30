import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";
import { navLinks } from "../../data/navLinks";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll detection and active section (ScrollSpy)
  useEffect(() => {
    const handleScroll = () => {
      // 1. Deteksi background navbar
      setScrolled(window.scrollY > 24);

      // 2. Deteksi Active Section (hanya jika di halaman utama)
      if (location.pathname !== "/") return;

      const sectionIds = navLinks
        .map((link) => {
          if (link.href === "/") return "home";
          if (link.href.startsWith("/#")) return link.href.split("#")[1];
          return null;
        })
        .filter(Boolean);

      // SAFETY: Jika layar ada di posisi paling atas, paksa aktifkan 'home'
      if (window.scrollY < 50) {
        setActiveSection("home");
        return;
      }

      // SAFETY: Jika layar sudah mentok ke paling bawah, aktifkan menu terakhir
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // 3. Hitung posisi semua section yang ada di halaman
      const visibleSections = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (element) {
            return { id, top: element.getBoundingClientRect().top };
          }
          return null;
        })
        .filter(Boolean);

      let currentActive = "home";

      // 4. Cek section mana yang posisinya paling mendekati navbar
      // Offset 150px untuk memberikan ruang navbar agar transisi state lebih mulus
      for (let i = 0; i < visibleSections.length; i++) {
        if (visibleSections[i].top <= 150) {
          currentActive = visibleSections[i].id;
        }
      }

      setActiveSection(currentActive);
    };

    // Jalankan sekali saat pertama render
    handleScroll();

    // Pasang event listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Handle hash navigation when opening page directly from URL
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const sectionId = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }, [location]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);

    if (location.pathname === "/") {
      if (href === "/") {
        window.history.pushState(null, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (href.startsWith("/#")) {
        const sectionId = href.split("#")[1];
        window.history.pushState(null, "", href);
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      return;
    }

    navigate(href);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);

    if (location.pathname === "/") {
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
  };

  const isActive = (href) => {
    if (location.pathname !== "/") return false;

    if (href === "/") {
      return activeSection === "home" || activeSection === "";
    }

    if (href.startsWith("/#")) {
      const sectionId = href.split("#")[1];
      return activeSection === sectionId;
    }

    return false;
  };

  return (
    <header
      className={`
        fixed
        top-0
        inset-x-0
        z-50
        transition-all
        duration-300
        ${
          scrolled
            ? `
              glass-card
              shadow-soft
              dark:shadow-none
              border-b
              border-black/5
              dark:border-white/10
              bg-white/80
              dark:bg-gray-900/80
              backdrop-blur-lg
            `
            : `
              bg-transparent
              border-b
              border-transparent
            `
        }
      `}
    >
      <nav
        className="
          max-w-6xl
          mx-auto
          px-6
          h-16
          flex
          items-center
          justify-between
        "
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={handleHomeClick}
          className="
            font-display
            font-semibold
            text-lg
            tracking-tight
            bg-gradient-to-r
            from-purple-600
            via-pink-500
            to-purple-600
            bg-clip-text
            text-transparent
            bg-size-200
            animate-gradient
            hover:opacity-80
            transition-opacity
          "
        >
          khairunnisaaptr
          <span
            className="
              text-light-textPrimary
              dark:text-dark-textPrimary
            "
          >
            .my.id
          </span>
        </Link>

        {/* Desktop Menu */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-8
          "
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`
                  text-sm
                  font-medium
                  transition-colors
                  relative
                  ${
                    active
                      ? `
                        text-purple-600
                        dark:text-purple-400
                      `
                      : `
                        text-light-textSecondary
                        dark:text-dark-textSecondary
                        hover:text-purple-600
                        dark:hover:text-purple-400
                      `
                  }
                  after:absolute
                  after:bottom-0
                  after:left-0
                  after:h-[2px]
                  after:bg-gradient-to-r
                  after:from-purple-600
                  after:to-pink-500
                  after:transition-all
                  after:duration-300
                  ${active ? "after:w-full" : "after:w-0 hover:after:w-full"}
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right */}
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <ThemeToggle />

          <button
            className="
              md:hidden
              h-10
              w-10
              flex
              items-center
              justify-center
              rounded-full
              text-light-textPrimary
              dark:text-dark-textPrimary
              hover:bg-light-surface
              dark:hover:bg-dark-surface
              transition-colors
            "
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
                md:hidden
                overflow-hidden
                glass-card
                border-t
                border-black/5
                dark:border-white/10
                bg-white/95
                dark:bg-gray-900/95
                backdrop-blur-lg
              "
          >
            <div
              className="
                  flex
                  flex-col
                  px-6
                  py-6
                  gap-4
                "
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`
                        text-base
                        font-medium
                        py-2
                        border-b
                        border-black/5
                        dark:border-white/5
                        last:border-0
                        transition-colors
                        ${
                          active
                            ? `
                              text-purple-600
                              dark:text-purple-400
                            `
                            : `
                              text-light-textSecondary
                              dark:text-dark-textSecondary
                              hover:text-purple-600
                              dark:hover:text-purple-400
                            `
                        }
                      `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}