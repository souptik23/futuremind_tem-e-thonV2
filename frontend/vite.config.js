import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true, // ✅ Ensures React Router handles navigation properly
  },
  server: {
    host: '0.0.0.0', // Expose on all available network interfaces
    port: 5173, // Or any other port you're using
  },
  theme: {
    extend: {
      backdropBlur: { 
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
    },
  },
  
});
