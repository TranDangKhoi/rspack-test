import { InferType, object, string } from "yup";

export const dadJokesSchema = object({
  term: string().required("Term is required").min(3, "Term is too short"),
});

export type TDadJokesSchema = InferType<typeof dadJokesSchema>;
