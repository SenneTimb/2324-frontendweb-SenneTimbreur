import { memo, useCallback } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { Tr, Td, IconButton } from "@chakra-ui/react";

export default memo(function Ouder(props) {
  const { id, voornaam, naam, telefoonnummer, onDelete } = props;
  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <Tr data-cy="ouder">
      <Td data-cy="ouder_voornaam">{voornaam}</Td>
      <Td data-cy="ouder_naam">{naam}</Td>
      <Td data-cy="ouder_telefoonnummer">{telefoonnummer}</Td>
      <Td>
        <IconButton
          colorScheme="red"
          aria-label="Delete"
          icon={<IoTrashOutline />}
          onClick={handleDelete}
          data-cy="ouder_verwijder_input"
        />
      </Td>
    </Tr>
  );
});
