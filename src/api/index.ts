import { LoginType } from "../index.d";

async function getLoginType() {
    const loginType: LoginType = localStorage.getItem("loginType") as LoginType ?? "CUSTOMER";
    return loginType;
}

export {
    getLoginType,
}