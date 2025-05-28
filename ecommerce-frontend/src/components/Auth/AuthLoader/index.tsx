
"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { loadFromStorage } from "@/redux/features/auth-slice";

export default function AuthLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return <>{children}</>;
}