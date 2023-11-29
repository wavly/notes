import { Auth, Typography, Button } from "@supabase/ui";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ReactNode } from "react";

const { Text } = Typography;

// Create a single Supabase client for interacting with your database
const supabase = createClient(
  "https://xyzcompany.supabase.co",
  "public-anon-key"
);

interface ContainerProps {
  supabaseClient: SupabaseClient;
  children?: ReactNode;
}

const Container = ({ supabaseClient, children }: ContainerProps) => {
  const { user } = Auth.useUser();
  if (user) {
    console.log(user);
    return (
      <>
        <Text>Signed in: {user.email}</Text>
        <Button block onClick={() => supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return <>{children}</>;
};

export default function AuthPage() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth providers={['facebook', 'github']} supabaseClient={supabase} />
      </Container>
    </Auth.UserContextProvider>
  );
}
