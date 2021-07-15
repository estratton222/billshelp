import { SimpleGrid, Text, Spinner, Flex, Fade } from "@chakra-ui/react";
import { useApartments } from "../hooks/useApartments";
import { ApartmentCard } from "./ApartmentCard";

export function ApartmentsList() {
  const {
    apartments,
    updateApartment,
    apartmentsRetrievalError,
    areApartmentsLoading,
  } = useApartments();

  if (apartmentsRetrievalError) {
    return <ErrorMessage />;
  }

  if (areApartmentsLoading) {
    return <LoadingSpinner />;
  }

  if (!apartments.length) {
    return <NoApartmentsMessage />;
  }

  return (
    <Fade transition={{ enter: { duration: 1 } }} in={!areApartmentsLoading}>
      <SimpleGrid minChildWidth="250px" gap={8}>
        {apartments.map((apartment, idx) => (
          <ApartmentCard
            onVisitedChange={updateApartment}
            key={idx}
            apartment={apartment}
          />
        ))}
      </SimpleGrid>
    </Fade>
  );
}

const LoadingSpinner = () => (
  <Flex justifyContent="center">
    <Spinner size="xl" />
  </Flex>
);

const NoApartmentsMessage = () => (
  <Text fontWeight="bold" color="orange">
    Sorry, probably there are no apartments assigned to you yet 😣
  </Text>
);

const ErrorMessage = () => (
  <Text fontWeight="bold" color="red">
    Sorry, something went wrong! Please check your setup 💀
  </Text>
);
