import React from "react";
import ResetPassword from "@/components/Auth/Reset";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Details Page for NextCommerce Template",
  // other metadata
};

const ResetPasswordPage = () => {
  return (
    <main>
      <ResetPassword />
    </main>
  );
};

export default ResetPasswordPage;
