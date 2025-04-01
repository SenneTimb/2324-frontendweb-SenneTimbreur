import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import useSWRMutation from "swr/mutation";
import * as api from "../api";

const JWT_TOKEN_KEY = "jwtToken";
const LEIDING_ID_KEY = "leidingId";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [leiding, setUser] = useState(null);

  useEffect(() => {
    api.setAuthToken(token);
    setIsAuthed(Boolean(token));
    setReady(true);
  }, [token]);

  const {
    isMutating: loadingLogin,
    error: errorLogin,
    trigger: doLogin,
  } = useSWRMutation("leiding/login", api.post);

  const {
    isMutating: loadingRegister,
    error: errorRegister,
    trigger: doRegister,
  } = useSWRMutation("leiding/register", api.post);

  const setSession = useCallback((token, leiding) => {
    setToken(token);
    setUser(leiding);

    localStorage.setItem(JWT_TOKEN_KEY, token);
    localStorage.setItem(LEIDING_ID_KEY, leiding.id);
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        const { token, leiding } = await doLogin({
          email,
          password,
        });

        setSession(token, leiding);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin, setSession]
  );

  const registreer = useCallback(
    async (naam, voornaam, afdeling, email, password) => {
      try {
        const { token, leiding } = await doRegister(
          naam,
          voornaam,
          afdeling,
          email,
          password
        );

        setSession(token, leiding);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doRegister, setSession]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(LEIDING_ID_KEY);
  }, []);

  const value = useMemo(
    () => ({
      token,
      leiding,
      error: errorLogin || errorRegister,
      ready,
      loading: loadingLogin || loadingRegister,
      isAuthed,
      registreer,
      login,
      logout,
    }),
    [
      token,
      leiding,
      errorLogin,
      errorRegister,
      ready,
      loadingLogin,
      loadingRegister,
      isAuthed,
      registreer,
      login,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
