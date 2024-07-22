import { hashSync, compareSync } from "bcryptjs";
import { SALT_ROUNDS } from "./constants/env.constant";

export const hash_string = (txt: string): string => {
  return hashSync(txt, SALT_ROUNDS);
};

export const compare_hashed_string = (txt1: string, txt2: string): boolean => {
  return compareSync(txt1, txt2);
};
