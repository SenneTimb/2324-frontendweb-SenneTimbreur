import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import Huisarts from "./Huisarts.jsx";

export default function HuisartsenTable({ huisartsen, onDelete }) {
  if (!Array.isArray(huisartsen) || huisartsen.length === 0) {
    return (
      <Box color="gray.500" textAlign="center" p="4">
        Nog geen huisartsen aanwezig.
      </Box>
    );
  }

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Voornaam</Th>
            <Th>Naam</Th>
            <Th>Telefoonnummer</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {huisartsen.map((huisarts) => (
            <Huisarts key={huisarts.id} onDelete={onDelete} {...huisarts} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
