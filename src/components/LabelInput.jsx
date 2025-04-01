import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export default function LabelInput({
  label,
  name,
  type,
  validationRules,
  ...rest
}) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const hasError = name in errors;

  return (
    <FormControl mb="3">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        {...register(name, validationRules)}
        id={name}
        type={type}
        isDisabled={isSubmitting}
        className="form-control"
        borderColor="blue.500"
        {...rest}
      />
      {hasError && (
        <FormHelperText color="red.500" data-cy="label_input_error">
          {errors[name].message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
