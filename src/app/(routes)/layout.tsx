"use client";

import "@/app/globals.css";
import { Auth } from "@/app/_lib/db";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let isAuthed: string | null = null;

  useEffect(()=> {
      const AuthDb = new Auth("auth");
      isAuthed = AuthDb.checkAuth();
  }, [])

  if (!isAuthed) {
    return redirect("/auth");
  }

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
