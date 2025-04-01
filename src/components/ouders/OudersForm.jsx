import { memo, useCallback, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { save, create } from "../../api";
import LabelInput from "../LabelInput";
import {
  Heading,
  Box,
  Button,
  FormControl,
  FormHelperText,
  VStack,
} from "@chakra-ui/react";

const validationRules = {
  naam: { required: "Naam verplicht" },
  voornaam: { required: "Voornaam verplicht" },
  telefoonnummer: {
    required: "Telefoonnummer verplicht",
    pattern: {
      value: /^0\d\/\d{2}\.\d{2}\.\d{2}.\d{1,2}$/,
      message:
        "Ongeldig telefoonnummer formaat. Gebruik het formaat 0X/XX.XX.XX.XX",
    },
  },
};

export default memo(function OudersForm({ ouder }) {
  const navigate = useNavigate();
  const { trigger: createOuder, error: createError } = useSWRMutation(
    "ouders",
    save
  );

  const methods = useForm();
  const { handleSubmit, reset, setValue, isSubmitting } = methods;

  const onSubmit = useCallback(
    async (data) => {
      await createOuder({
        ...data,
      });
      navigate("/ouders");
    },
    [reset, createOuder, navigate]
  );

  useEffect(() => {
    if (
      ouder &&
      (Object.keys(ouder).length !== 0 || ouder.constructor !== Object)
    ) {
      setValue("naam", ouder.naam);
      setValue("voornaam", ouder.voornaam);
      setValue("telefoonnummer", ouder.telefoonnummer);
    } else {
      reset();
    }
  }, [ouder, setValue, reset]);

  return (
    <VStack spacing="4" align="start" mb="4">
      <Heading as="h2" size="lg">
        Toevoegen van een ouder
      </Heading>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-50">
          <Box>
            <FormControl mb="3">
              <LabelInput
                label="Voornaam"
                name="voornaam"
                default="Lars"
                type="text"
                data-cy="ouder_voornaam_input"
                validationRules={validationRules.voornaam}
              />
            </FormControl>

            <FormControl mb="3">
              <LabelInput
                label="Naam"
                name="naam"
                default="Vande Moortele"
                type="text"
                data-cy="ouder_naam_input"
                validationRules={validationRules.naam}
              />
            </FormControl>

            <FormControl mb="3">
              <LabelInput
                label="Telefoonnummer (formaat: 0X/XX.XX.XX.XX)"
                name="telefoonnummer"
                type="text"
                validationRules={validationRules.telefoonnummer}
                data-cy="ouder_telefoonnummer_input"
              />
            </FormControl>
          </Box>

          <Button
            type="submit"
            colorScheme="green"
            isLoading={isSubmitting}
            data-cy="voeg_ouder_toe"
          >
            Voeg ouder toe
          </Button>
        </form>
      </FormProvider>
    </VStack>
  );
});
