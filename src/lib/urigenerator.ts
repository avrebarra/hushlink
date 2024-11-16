import Obfuscator from "./obfuscator";

const ENCODER_KEY = "what does life means without questions?";
const obfuscator = Obfuscator(ENCODER_KEY);

type URLData = {
  url: string;
};

const encodeURL = (url: URLData): string => {
  let out = JSON.stringify(url);
  out = obfuscator.obfuscate(out);
  out = Buffer.from(out).toString("base64");
  out = out.replace(/=+$/, ""); // remove base64 padding
  return out;
};

const decodeURL = (s: string): URLData => {
  s = Buffer.from(s, "base64").toString();
  s = obfuscator.deobfuscate(s);
  const out: URLData = JSON.parse(s);
  return out;
};

export { URLData, encodeURL, decodeURL };
