import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Lid from "./Lid.jsx";

export default function LedenTable({ leden, onDelete }) {
  if (!Array.isArray(leden) || leden.length === 0) {
    return <Box color="gray.500">Nog geen leden.</Box>;
  }

  return (
    <Box overflowX="auto">
      <Table variant="striped" colorScheme="blue" size="sm">
        <Thead>
          <Tr>
            <Th>Voornaam</Th>
            <Th>Naam</Th>
            <Th>Afdeling</Th>
            <Th>Dokter</Th>
            <Th>Leiding</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {leden.map((lid) => (
            <Lid key={lid.id} onDelete={onDelete} {...lid} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
