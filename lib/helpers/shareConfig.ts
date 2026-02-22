const toBase64 = (bytes: Uint8Array): string => {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

const fromBase64 = (base64: string): Uint8Array => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
};

const toBase64Url = (base64: string): string => {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

const fromBase64Url = (base64Url: string): string => {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const padding = (4 - (base64.length % 4)) % 4;
  return base64 + "=".repeat(padding);
};

export const encodeConfig = (config: unknown): string => {
  const json = JSON.stringify(config);
  const bytes = new TextEncoder().encode(json);
  return toBase64Url(toBase64(bytes));
};

export const decodeConfig = <T = Record<string, unknown>>(encoded: string): T => {
  const bytes = fromBase64(fromBase64Url(encoded));
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json) as T;
};