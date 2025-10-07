import z from "zod";
import patterns from "./constanst";

const requiredStringSchema = z.string().min(1).max(255).trim();
const regexSchema = (pattern: RegExp) => z.coerce.string().regex(pattern);

const passwordSchema = z
  .string()
  .max(255)
  .refine((str) => patterns.minimumOneUpperCaseLetter.test(str), {
    message: "Must contain at least one uppercase letter",
  })
  .refine((str) => patterns.minimumOneLowerCaseLetter.test(str), {
    message: "Must contain at least one lowercase letter",
  })
  .refine((str) => patterns.minimumOneDigit.test(str), {
    message: "Must contain at least one digit",
  })
  .refine((str) => patterns.minimumOneDigit.test(str), {
    message: "Must contain at least one digit",
  })
  .refine((str) => patterns.minimumOneSpecialCharacter.test(str), {
    message: "Must contain at least one special character",
  })
  .refine((str) => patterns.minEightCharacters.test(str), {
    message: "Must be at least 8 characters long",
  });

  export {
    requiredStringSchema,
    regexSchema,
    passwordSchema
  }