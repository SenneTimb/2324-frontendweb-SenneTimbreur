import React from "react";
import { Tr, Td, Button } from "@chakra-ui/react";
import { IoTrashOutline } from "react-icons/io5";

const Huisarts = ({ voornaam, naam, telefoonnummer, onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <Tr data-cy="huisarts">
      <Td data-cy="huisarts_voornaam">{voornaam}</Td>
      <Td data-cy="huisarts_naam">{naam}</Td>
      <Td data-cy="huisarts_telefoonnummer">{telefoonnummer}</Td>
      <Td>
        <Button
          colorScheme="red"
          onClick={handleDelete}
          data-cy="huisarts_verwijderen_knop"
        >
          <IoTrashOutline />
        </Button>
      </Td>
    </Tr>
  );
};

export default React.memo(Huisarts);
