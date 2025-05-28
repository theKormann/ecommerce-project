// app/(site)/layout.tsx
"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import { ReduxProvider } from "@/redux/provider";
import { AuthProvider } from "../context/AuthContext";

import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import AuthLoader from "@/components/Auth/AuthLoader";

function ReduxWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <AuthProvider>
      <CartModalProvider>
        <ModalProvider>
          <PreviewSliderProvider>
            <AuthLoader>
              <Header />
              {children}
              <QuickViewModal />
              <CartSidebarModal />
              <PreviewSliderModal />
            </AuthLoader>
          </PreviewSliderProvider>
        </ModalProvider>
      </CartModalProvider>
      <ScrollToTop />
      <Footer />
    </AuthProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ReduxProvider>
          <ReduxWrapper>{children}</ReduxWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}