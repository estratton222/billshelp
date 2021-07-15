import { Flex, Box, Heading, Button } from "@chakra-ui/react";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";

type MainProps = {
  children: JSX.Element;
};

export function MainLayout({ children }: MainProps) {
  return (
    <Box margin="0 auto">
      <Flex
        justifyContent="center"
        alignItems="center"
        minHeight="300"
        bgImage="url('images/pattern-dark.svg')"
        backgroundPosition="right"
        mb="2em"
      >
        <Heading as="h1" fontSize="5xl" textAlign="center" color="white">
          Clerk Airtable Apartment Hunt
        </Heading>
      </Flex>
      <Box margin="0 auto" maxW={1000}>
        <SignedIn>{children}</SignedIn>
      </Box>
      <Flex justifyContent="center" mt="10">
        <SignedIn>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </Flex>
    </Box>
  );
}

const SignInButton = () => {
  const { openSignIn } = useClerk();
  return (
    <Button
      mr="10"
      variant="solid"
      colorScheme="green"
      onClick={() => openSignIn({})}
    >
      Sign in to your apartment hunt progress!
    </Button>
  );
};

const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    <Button mr="10" variant="solid" colorScheme="red" onClick={() => signOut()}>
      Sign out of your apartment hunt progress!
    </Button>
  );
};
