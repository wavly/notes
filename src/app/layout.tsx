import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";
import { Theme, Card, Container, Flex } from "@radix-ui/themes";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { MetaConfig } from "@/config/siteConfig";

export const metadata: Metadata = MetaConfig;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body style={{ padding: 0, margin: 0 }}>
				<Theme accentColor="iris" style={{ backgroundColor: "var(--gray-1)" }}>
					<Container px="5">
						<Flex align="center" style={{ height: "100vh" }} py="9">
							<Flex
								direction="column"
								style={{
									height: "100%",
									maxHeight: 850,
									minHeight: 500,
									width: "100%",
								}}
								gap="5"
							>
								<Flex grow="1">
									<Card size="4" style={{ width: "100%" }}>
										<Flex direction="column" height="100%">
											<Flex asChild justify="between">
												<Header />
											</Flex>
										</Flex>
									</Card>
								</Flex>
								<Flex grow="1" align="center" justify="center">
									<main>{children}</main>
								</Flex>
								<Footer />
							</Flex>
						</Flex>
					</Container>
				</Theme>
			</body>
		</html>
	);
}
