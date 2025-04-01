import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";
import { useThemeColors } from "../contexts/Theme.context";

export default function Register() {
  const { theme, oppositeTheme } = useThemeColors();
  const { error, loading, registreer } = useAuth();
  const navigate = useNavigate();

  const methods = useForm();
  const { register, getValues, handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async ({ naam, voornaam, afdeling, email, password }) => {
      const loggedIn = await registreer({
        naam,
        voornaam,
        afdeling,
        email,
        password,
      });

      if (loggedIn) {
        navigate({
          pathname: "/",
          replace: true,
        });
      }
    },
    [registreer, navigate]
  );

  const validationRules = useMemo(
    () => ({
      naam: {
        required: "Naam is verplicht",
      },
      voornaam: {
        required: "Voornaam is verplicht",
      },
      afdeling: {
        required: "Afdeling is verplicht",
      },
      email: {
        required: "Email is verplicht",
      },
      password: {
        required: "Wachtwoord is verplicht",
      },

      confirmPassword: {
        required: "Wachtwoord conformatie is verplicht",
        validate: (value) => {
          const password = getValues("password");
          return password === value || "Wachtwoorden komen niet overeen";
        },
      },
    }),
    [getValues]
  );

  return (
    <FormProvider {...methods}>
      <div className={`container bg-${theme} text-${oppositeTheme}`}>
        <form
          className="d-flex flex-column"
          onSubmit={handleSubmit(handleRegister)}
        >
          <h1>Registreren</h1>

          <Error error={error} />

          <LabelInput
            label="Vooraam"
            type="text"
            name="voornaam"
            placeholder="Uw voornaam"
            validationRules={validationRules.voornaam}
          />

          <LabelInput
            label="Naam"
            type="text"
            name="naam"
            placeholder="Uw naam"
            validationRules={validationRules.naam}
          />

          <div className="mb-3">
            <label htmlFor="afdeling" className="form-label">
              Afdeling
            </label>
            <select
              {...register("afdeling")}
              id="afdeling"
              className="form-select"
              defaultValue="speelclub"
              data-cy="lid_afdeling_input"
              validationRules={validationRules.afdeling}
            >
              <option default Checked value="">
                -- Selecteer een afdeling --
              </option>
              <option>pinkel</option>
              <option>speelclub</option>
              <option>rakwi</option>
              <option>tito</option>
              <option>keti</option>
              <option>aspi</option>
            </select>
          </div>

          <LabelInput
            label="Email"
            type="text"
            name="email"
            placeholder="your@email.com"
            validationRules={validationRules.email}
          />

          <LabelInput
            label="Wachtwoord"
            type="password"
            name="password"
            validationRules={validationRules.password}
          />

          <LabelInput
            label="Bevestig wachtwoord"
            type="password"
            name="confirmPassword"
            validationRules={validationRules.confirmPassword}
          />

          <div className="clearfix">
            <div className="btn-group float-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Registreer
              </button>

              <button
                type="button"
                className="btn btn-light"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
