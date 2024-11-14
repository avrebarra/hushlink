import { createHash } from "crypto";

const Obfuscator = (key: string) => {
  key = hashSHA1(key);
  const obfuscate = (str: string): string => {
    const chars = str.split("");
    const obfuscated = chars.map((char, index) => {
      const keyCode = key.charCodeAt(index % key.length);
      const charCode = char.charCodeAt(0);
      const shiftedCode = charCode ^ keyCode;
      return String.fromCharCode(shiftedCode);
    });
    return obfuscated.join("");
  };

  const deobfuscate = (str: string): string => {
    const chars = str.split("");
    const deobfuscated = chars.map((char, index) => {
      const keyCode = key.charCodeAt(index % key.length);
      const charCode = char.charCodeAt(0);
      const shiftedCode = charCode ^ keyCode;
      return String.fromCharCode(shiftedCode);
    });
    return deobfuscated.join("");
  };

  return {
    obfuscate,
    deobfuscate,
  };
};

const hashSHA1 = (s: string): string => {
  const hash = createHash("sha1");
  hash.update(s);
  return hash.digest("hex");
};

export default Obfuscator;
