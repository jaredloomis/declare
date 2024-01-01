import { atom } from "jotai";
import { User } from "../../gql/graphql";
import { getUser } from "./api";

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
}

export const authTokenAtom = atom(
  () => localStorage.getItem("declare_token"),
  (g, w, val) => localStorage.setItem("declare_token", val as string),
);

export const authUserAtom = atom<Promise<User | undefined>>(
  async (get: any) => {
    try {
      const userId = parseJwt(get(authTokenAtom)).id;
      return getUser(userId);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  },
);
