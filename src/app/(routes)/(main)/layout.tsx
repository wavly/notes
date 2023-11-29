// "use client";

import "@/styles/globals.css";
import Navigation from "../_components/navigation";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<main className="h-full w-full">
				<div className="h-full flex flex-row dark:bg-[#1F1F1F]">
					<Navigation />
					<div className="flex-1 items-center justify-center overflow-y-auto">
						{children}
					</div>
				</div>
			</main>
		</>
	);
}
