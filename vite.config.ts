import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // 👈 αυτό λείπει
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(), // απαραίτητο για React/TSX
    tailwindcss(), // Tailwind
  ],
  base: "/react-movie-explorer/", // απαραίτητο για GitHub Pages
});
