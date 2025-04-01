import { memo, useCallback, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { save } from "../../api";
import LabelInput from "../LabelInput";
import { useAuth } from "../../contexts/Auth.context";
import {
  Box,
  Button,
  Heading,
  Select,
  VStack,
  FormControl,
  FormLabel,
  Select as ChakraSelect,
} from "@chakra-ui/react";

const selectStyles = {
  borderColor: "blue.500",
  color: "black",
  styles: {
    placeholder: {
      color: "gray.500",
    },
  },
};

const toDateInputString = (date) => {
  if (!date) return null;
  if (typeof date !== Object) {
    date = new Date(date);
  }
  let asString = date.toISOString();
  return asString.substring(0, asString.indexOf("T"));
};

const validationRules = {
  geboortedatum: {
    required: "Geboortedatum is verplicht",
    validate: (value) => {
      const currentDate = new Date();
      const selectedDate = new Date(value);
      if (selectedDate > currentDate) {
        return "Geboortedatum moet voor vandaag liggen.";
      }
      return undefined;
    },
  },
  naam: { required: "Naam verplicht" },
  voornaam: { required: "Voornaam verplicht" },
};

function OudersSelect({ naam, ouders }) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = naam in errors;

  return (
    <FormControl mb="3">
      <FormLabel htmlFor={naam}>Ouder</FormLabel>
      <ChakraSelect
        {...register(naam)}
        id={naam}
        placeholder="-- Selecteer een ouder --"
        isDisabled={isSubmitting}
        borderColor="blue.500"
        {...selectStyles}
      >
        {ouders.map(({ id, voornaam, naam }) => (
          <option key={id} value={id}>
            {naam + " " + voornaam}
          </option>
        ))}
      </ChakraSelect>
      {hasError && (
        <FormHelperText color="red.500" data-cy={`${naam}_input_error`}>
          {errors[naam].message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

function HuisartsenSelect({ naam, huisartsen }) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = naam in errors;

  return (
    <FormControl mb="3">
      <FormLabel htmlFor={naam}>Huisarts</FormLabel>
      <ChakraSelect
        {...register(naam)}
        id={naam}
        placeholder="-- Selecteer een huisarts --"
        isDisabled={isSubmitting}
        borderColor="blue.500"
        data-cy="ouder_input"
        {...selectStyles}
      >
        {huisartsen.map(({ id, voornaam, naam }) => (
          <option key={id} value={id}>
            {naam + " " + voornaam}
          </option>
        ))}
      </ChakraSelect>
      {hasError && (
        <FormHelperText color="red.500" data-cy={`${naam}_input_error`}>
          {errors[naam].message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default memo(function LedenForm({ huisartsen, ouders, lid }) {
  const navigate = useNavigate();
  const { trigger: createLid, error: createError } = useSWRMutation(
    "leden",
    save
  );
  const { isAuthed, logout } = useAuth();
  const LEIDING_ID_KEY = "leidingId";

  const methods = useForm();
  const { register, handleSubmit, reset, setValue, isSubmitting } = methods;

  const onSubmit = useCallback(
    async (data) => {
      console.log(data);
      await createLid({
        ...data,
        leiding_id: localStorage.getItem(LEIDING_ID_KEY),
      });
      navigate("/leden");
    },
    [reset, createLid, navigate]
  );

  useEffect(() => {
    if (lid && (Object.keys(lid).length !== 0 || lid.constructor !== Object)) {
      const dateAsString = toDateInputString(new Date(lid.geboortedatum));
      setValue("geboortedatum", dateAsString);
      setValue("naam", lid.naam);
      setValue("voornaam", lid.voornaam);
      setValue("afdeling", lid.afdeling);
      setValue("ouder1", lid.ouder_id1);
      setValue("ouder2", lid.ouder_id2);
    } else {
      reset();
    }
  }, [lid, setValue, reset]);

  return (
    <VStack spacing="4" align="start">
      <Heading as="h2" size="lg">
        Toevoegen van een lid
      </Heading>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-50 mb-3">
          <FormControl mb="3">
            <LabelInput
              label="Voornaam"
              name="voornaam"
              default="Lars"
              type="text"
              data-cy="lid_voornaam_input"
              validationRules={validationRules.voornaam}
            />
          </FormControl>

          <FormControl mb="3">
            <LabelInput
              label="Naam"
              name="naam"
              default="Vande Moortele"
              type="text"
              data-cy="lid_naam_input"
              validationRules={validationRules.naam}
            />
          </FormControl>

          <FormControl mb="3">
            <label htmlFor="afdeling" className="form-label">
              Afdeling
            </label>
            <Select
              {...register("afdeling", validationRules.afdeling)}
              id="afdeling"
              placeholder="-- Selecteer een afdeling --"
              data-cy="lid_afdeling_input"
              required
              {...selectStyles}
            >
              <option value="pinkel">Pinkel</option>
              <option value="speelclub">Speelclub</option>
              <option value="rakwi">Rakwi</option>
              <option value="tito">Tito</option>
              <option value="keti">Keti</option>
              <option value="aspi">Aspi</option>
            </Select>
          </FormControl>

          <FormControl mb="3">
            <LabelInput
              label="Geboortedatum"
              name="geboortedatum"
              type="date"
              data-cy="lid_geboortedatum_input"
              validationRules={validationRules.geboortedatum}
            />
          </FormControl>

          <FormControl mb="3">
            <OudersSelect naam="ouder_id1" ouders={ouders} />
          </FormControl>

          <FormControl mb="3">
            <OudersSelect
              naam="ouder_id2"
              ouders={ouders}
              data-cy="ouder2_input"
            />
          </FormControl>

          <FormControl mb="3">
            <HuisartsenSelect
              naam="huisarts_id"
              huisartsen={huisartsen}
              data-cy="huisarts_input"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            isLoading={isSubmitting}
            data-cy="voeg_lid_toe"
          >
            Voeg lid toe
          </Button>
        </form>
      </FormProvider>
    </VStack>
  );
});
