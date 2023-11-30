import NextLink from "next/link";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";

import { getUser } from "@/lib/auth";
import { AuthButton } from "@/app/_components/authButton";

export default async function HomePage() {
  const { isAuthenticated, user } = await getUser();

  return (
    <Flex direction="column" align="center" gap="2">
      <section>
        <div id="badge">NO.1 TASK MANAGEMENT</div>
        <Heading size="8">Wavly - Notes App</Heading>
        <Text size="5" color="gray">
          {isAuthenticated
            ? `Welcome back${user?.firstName && `, ${user?.firstName}`}`
            : "Sign in to use the intuitive and feature-rich tool that enables effective team collaboration and efficient project management."}
        </Text>
        <br />
        <Text size="5" color="gray">
			Stay organized and reach new productivity peaks with Wavly - Notes App.
        </Text>
        <Flex align="center" gap="3" mt="4">
          {isAuthenticated ? (
            <Button asChild size="3" variant="soft">
              <NextLink href="/notes">Get Started</NextLink>
            </Button>
          ) : (
            <AuthButton large />
          )}
        </Flex>
      </section>
      <section>
        <Text size="5" color="gray">
          {isAuthenticated ? "Ready to take more notes?" : "You're just ONE click away..." }
        </Text>
      </section>
    </Flex>
  );
}
