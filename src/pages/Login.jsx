import { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";

const validationRules = {
  email: {
    required: "Email is verplicht",
  },
  wachtwoord: {
    required: "Wachtwoord is verplicht",
  },
};

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirect = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams.has("redirect")) return urlParams.get("redirect");
    return "/";
  }, [search]);

  const methods = useForm({
    defaultValues: {
      email: "user@gmail.com",
      wachtwoord: "usertest",
    },
  });
  const { handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ email, wachtwoord }) => {
      const loggedIn = await login(email, wachtwoord);

      if (loggedIn) {
        navigate({
          pathname: redirect,
          replace: true,
        });
      }
    },
    [login, navigate, redirect]
  );

  return (
    <FormProvider {...methods}>
      <div className="container">
        <form
          className="d-flex flex-column"
          onSubmit={handleSubmit(handleLogin)}
        >
          {" "}
          <h1>Aanmelden</h1>
          <Error error={error} />
          <LabelInput
            label="email"
            type="text"
            name="email"
            placeholder="your@email.com"
            validationRules={validationRules.email}
          />
          <LabelInput
            label="wachtwoord"
            type="password"
            name="wachtwoord"
            validationRules={validationRules.password}
          />
          <div className="clearfix">
            <div className="btn-group float-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                data-cy="log_in"
              >
                Sign in
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
