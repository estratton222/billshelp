import { Box, Image, Flex, Badge, Text, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import type { ApartmentRecord } from "../../types";

type ApartmentCardProps = {
  apartment: ApartmentRecord;
  onVisitedChange: (apartment: Partial<ApartmentRecord>) => Promise<void>;
};

export function ApartmentCard({
  apartment,
  onVisitedChange,
}: ApartmentCardProps) {
  const [isVisited, setIsVisited] = useState(
    apartment.fields["Visited?"] || false
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleVisitedChange = async function () {
    setIsUpdating(true);
    try {
      await onVisitedChange({
        id: apartment.id,
        fields: { ...apartment.fields, "Visited?": !isVisited },
      });
      setIsVisited(!isVisited);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Flex
      flex="1"
      flexDirection="column"
      p="5"
      borderWidth="1px"
      borderRadius="14px"
      borderColor="#ccc"
      flexFlow="wrap"
    >
      <Flex height="200px" justifyContent="center" padding="20px 0">
        <Image
          objectFit="contain"
          borderRadius="md"
          alt={apartment.fields.Name}
          src={apartment.fields.Pictures[0].url}
        />
      </Flex>
      <Flex flexWrap="wrap" mt={2}>
        {apartment.fields.Features.map((feature, idx) => (
          <Badge mb="1" mr="1" key={idx} variant="subtle" colorScheme="orange">
            {feature}
          </Badge>
        ))}
      </Flex>
      <Box>
        <Text
          noOfLines={2}
          mt={2}
          fontSize="xl"
          fontWeight="semibold"
          lineHeight="short"
        >
          {apartment.fields.Name}
        </Text>
      </Box>
      <Box>
        <Text mt={2}>
          <b>{apartment.fields["Square Feet"]}</b> square feet
        </Text>
        <Text mt={2}>
          <b>{apartment.fields["Monthly Rent"]}$</b> Monthly Rent
        </Text>
      </Box>
      <Box width="100%">
        <Checkbox
          mb="0"
          mt="auto"
          paddingTop={2}
          isChecked={isVisited}
          disabled={isUpdating}
          onChange={handleVisitedChange}
        >
          Visited
        </Checkbox>
        <Text>
          <i>Assigned to {apartment.fields["Email"]}</i>
        </Text>
      </Box>
    </Flex>
  );
}
