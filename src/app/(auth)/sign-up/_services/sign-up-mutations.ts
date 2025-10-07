"use server";

import { executeAction } from "@/lib/executeAction";
import { signUpSchema, SignUpSchema } from "../_types/signUpSchema";
import { hashPassword } from "@/lib/auth-utils";
import db from "@/lib/db";

const signUp = async (data: SignUpSchema) => {
  await executeAction({
    actionFn: async () => {
      const validateData = signUpSchema.parse(data);
      const hashedPassword = await hashPassword(validateData.password);

      await db.user.create({
        data: {
          name: validateData.name,
          email: validateData.email,
          password: hashedPassword,
          role: "USER",
        },
      });
    },
  });
};

export default signUp;
