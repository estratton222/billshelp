import { Flex, Box, Heading } from "@chakra-ui/react";

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
          Clerk-Airtable Apartment Hunt
        </Heading>
      </Flex>
      <Box margin="0 auto" maxW={1000}>
        {children}
      </Box>
    </Box>
  );
}
