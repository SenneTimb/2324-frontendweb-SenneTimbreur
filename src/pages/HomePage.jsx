import { Box, Heading, Text, Image } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box textAlign="center" mt="8" data-cy="home_page">
      <Heading as="h1" size="xl" mb="4">
        Welcome to Chiro Waarschoot
      </Heading>
      <Text fontSize="lg" mb="4">
        Zoek verschillende leden of ouders op.
      </Text>
      <Text fontSize="lg" mb="8">
        Ontdek de leidingsomgeving voor Chiro Waarschoot.
      </Text>
    </Box>
  );
}
