import { atom } from "jotai";
import Cookies from "js-cookie";

export const authToken = atom(
  () => Cookies.get("declare_token"),
  (g, w, val) => Cookies.set("declare_token", val as string),
);
