"use client";

import "@/styles/globals.css";
import { redirect } from "next/navigation";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	let isAuthed: boolean = true;

	if (!isAuthed) {
		return redirect("/auth");
	}

	return <main className="h-full w-full">{children}</main>;
}
