import Ouder from "./Ouder.jsx";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function OudersTable({ ouders, onDelete }) {
  if (ouders.length === 0) {
    return <div className="alert alert-info">Nog geen ouders.</div>;
  }

  return (
    <Table variant="striped" colorScheme="teal" size="sm">
      <Thead>
        <Tr>
          <Th >Voornaam</Th>
          <Th>Naam</Th>
          <Th>Telefoonnummer</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {ouders.map((ouder) => (
          <Ouder key={ouder.id} onDelete={onDelete} {...ouder} />
        ))}
      </Tbody>
    </Table>
  );
}
