import React, { memo, useCallback } from "react";
import { Box, IconButton, Tr, Td } from "@chakra-ui/react";
import { IoTrashOutline } from "react-icons/io5";

export default memo(function Lid(props) {
  const { id, voornaam, naam, afdeling, huisarts, leiding, onDelete } = props;
  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <Tr data-cy="lid">
      <Td data-cy="lid_voornaam">{voornaam}</Td>
      <Td data-cy="lid_naam">{naam}</Td>
      <Td data-cy="lid_afdeling">{afdeling}</Td>
      <Td data-cy="lid_huisarts">
        {huisarts.voornaam} {huisarts.naam}
      </Td>
      <Td data-cy="lid_leiding">
        {leiding.voornaam} {leiding.naam}
      </Td>
      <Td>
        <IconButton
          icon={<IoTrashOutline />}
          colorScheme="red"
          aria-label="Delete"
          onClick={handleDelete}
          data-cy="lid_verwijderen_knop"
        />
      </Td>
    </Tr>
  );
});
