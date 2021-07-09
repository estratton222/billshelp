import { Button } from "@chakra-ui/react";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import Head from "next/head";
import { ApartmentsList } from "../client/components/ApartmentsList";

export default function Index() {
  return (
    <>
      <Head>
        <title>Clerk Airtable Apartments</title>
        <meta name="description" content="Clerk-Airtable integration" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SignedIn>
        <ApartmentsList />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}

const SignInButton = () => {
  const { openSignIn } = useClerk();
  return (
    <Button mt="6" variant="outline" onClick={() => openSignIn({})}>
      Sign in to your apartment hunt progress!
    </Button>
  );
};
