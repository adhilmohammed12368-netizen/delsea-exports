import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { NavBar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export function Layout() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <ScrollToTop />
        <NavBar />
        <main id="main">
          <Outlet />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
