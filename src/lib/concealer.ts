const ZERO: string = "​";
const ONE: string = "‍";
const SPACE: string = "‌";

const CHARS: string[] = [ZERO, ONE, SPACE];

function conceal(raw: string): string {
  raw = strToBinary(raw);
  let enc = raw.replace(/0/g, ZERO);
  enc = enc.replace(/1/g, ONE);
  enc = enc.replace(/ /g, SPACE);
  return enc;
}

function reveal(enc: string): string {
  let raw = enc.replace(new RegExp(ZERO, "g"), "0");
  raw = raw.replace(new RegExp(ONE, "g"), "1");
  raw = raw.replace(new RegExp(SPACE, "g"), " ");
  raw = binaryToStr(raw);
  return raw;
}

function binaryToStr(binary: string): string {
  return binary
    .split(" ")
    .map((char) => String.fromCharCode(parseInt(char, 2)))
    .join("");
}

function strToBinary(str: string): string {
  return str
    .split("")
    .map((char) => char.charCodeAt(0).toString(2))
    .join(" ");
}

export { CHARS, conceal, reveal };
