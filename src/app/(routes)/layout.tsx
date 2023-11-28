"use client";

import "@/app/globals.css";
import Navigation from "./_components/navigation";

import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let isAuthed: string = "auth";

  if (!isAuthed) {
    return redirect("/auth");
  }

  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full">
      <div className="h-full flex flex-row dark:bg-[#1F1F1F]">
        <Navigation />
        <div className="flex-1 items-center justify-center overflow-y-auto">{children}</div></div>
      </body>
    </html>
  );
}
