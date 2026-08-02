type CnInput = string | false | null | undefined;

export function cn(...inputs: CnInput[]): string {
  return inputs.filter(Boolean).join(" ");
}
