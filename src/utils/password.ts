import Hex from "crypto-js/enc-hex";
import WordArray from "crypto-js/lib-typedarrays";
import PBKDF2 from "crypto-js/pbkdf2";

export function getHashedPassword(password: string, salt: string) {
  return PBKDF2(password, salt, {
    keySize: 128 / 8,
    iterations: 1000,
  }).toString(Hex);
}

export function generateSalt() {
  return WordArray.random(32 / 2).toString(Hex);
}
