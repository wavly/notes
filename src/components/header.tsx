import NextLink from "next/link";
import "@radix-ui/themes/styles.css";
import { Flex, Button } from "@radix-ui/themes";

import { getUser } from "@/lib/auth";
import { AuthButton } from "../app/_components/authButton";

export default async function Header() {
	const { isAuthenticated } = await getUser();

	return (
		<>
			<header>
				<Flex gap="4">
					<Button asChild variant="soft">
						<NextLink href="/">Home</NextLink>
					</Button>

					<Button asChild variant="soft">
						<NextLink href="/account">Account</NextLink>
					</Button>

					{isAuthenticated && (
						<Button asChild variant="soft">
							<NextLink href="/notes">Notes</NextLink>
						</Button>
					)}
				</Flex>

				<AuthButton />
			</header>
		</>
	);
}
