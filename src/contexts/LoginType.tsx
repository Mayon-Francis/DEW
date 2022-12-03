import React, { useEffect, useState } from "react";
import { getLoginType } from "../api";
import { LoginType } from "../index.d";

export const LoginTypeContext = React.createContext<any>({
  loginType: LoginType,
});

export function LoginState(props: any) {
  const [loginType, setLoginType] = useState<LoginType>(LoginType.CUSTOMER);

  function setLoginTypeFromUser(loginType: LoginType) {
    localStorage.setItem("loginType", loginType);
    setLoginType(loginType);
  }
  useEffect(() => { 
    console.log("LoginState useEffect", loginType);
  }, [loginType]);

  useEffect(() => {
    (async function () {
      const loginType: LoginType = await getLoginType();
      setLoginType(loginType);
    })();
  }, []);
  return (
    <LoginTypeContext.Provider value={{ loginType, setLoginTypeFromUser }}>
      {props.children}
    </LoginTypeContext.Provider>
  );
}

export function useLoginTypeContext() {
  return React.useContext(LoginTypeContext);
}
