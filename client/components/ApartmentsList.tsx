import { SimpleGrid, Text } from "@chakra-ui/react";
import { useApartments } from "../hooks/useApartments";
import { ApartmentCard } from "./ApartmentCard";

export function ApartmentsList() {
  const { apartments, updateApartment, apartmentsRetrievalError } =
    useApartments();

  if (apartmentsRetrievalError) {
    return <ErrorMessage />;
  }

  return (
    <SimpleGrid minChildWidth="250px" gap={8}>
      {apartments.map((apartment, idx) => (
        <ApartmentCard
          onVisitedChange={updateApartment}
          key={idx}
          apartment={apartment}
        />
      ))}
    </SimpleGrid>
  );
}

const ErrorMessage = () => (
  <Text color="red">
    Sorry, something went wrong! Please check your setup 💀
  </Text>
);
