import "@/styles/globals.css";
import type { Metadata } from "next";

import Header from "@/components/header";
import Footer from "@/components/footer";



export const metadata: Metadata = {
  title: "Wavly",
  description: "The Note taking App",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="flex flex-col relative min-h-screen items-center">
				<Header />
				<main className="flex-1 flex-col gap-2 p-4">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
