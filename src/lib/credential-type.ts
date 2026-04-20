export enum CredentialType {
  OPENAI = "OPENAI",
  ANTHROPIC = "ANTHROPIC",
  GEMINI = "GEMINI"
}

export type CredentialDto = {
  id: string;
  name: string;
  value: string;
  type: "OPENAI" | "ANTHROPIC" | "GEMINI";
  createdAt: string;
  updatedAt: string;
};
