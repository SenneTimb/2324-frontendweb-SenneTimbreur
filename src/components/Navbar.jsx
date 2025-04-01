import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Spacer,
  useColorMode,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";
import { useAuth } from "../contexts/Auth.context";
import { useTheme } from "../contexts/Theme.context";
import homeImage from "../../images/ChiroWaarschootLogo.jpg";

export default function Navbar() {
  const { isAuthed } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box data-cy="navbar" as="nav" bg={`${colorMode}.500`} color={`text.${colorMode}`}>
      <Flex align="center" p="4">
        <Box as={Link} to="/home" mr="16">
          <Image src={homeImage} alt="Home" boxSize="50px" />
        </Box>
        <Box as={Link} to="/ouders" mr="8">
          Ouders
        </Box>
        <Box as={Link} to="/ouders/form" mr="16">
          Voeg een ouder toe
        </Box>
        <Box as={Link} to="/leden" mr="8">
          Leden
        </Box>
        <Box as={Link} to="/leden/form" mr="16">
          Voeg een lid toe
        </Box>
        <Box as={Link} to="/huisartsen" mr="8">
          Huisartsen
        </Box>
        <Spacer />
        {isAuthed ? (
          <Box as={Link} to="/logout" mr="8">
            Log out
          </Box>
        ) : (
          <>
            <Box as={Link} to="/login" mr="8">
              Log in
            </Box>
            <Box as={Link} to="/register" mr="8">
              Registreren
            </Box>
          </>
        )}
        <IconButton
          onClick={() => {
            toggleTheme();
            toggleColorMode();
          }}
          icon={theme === "dark" ? <IoMoonSharp /> : <IoSunnySharp />}
          data-cy="toggle_theme"
        />
      </Flex>
    </Box>
  );
}
