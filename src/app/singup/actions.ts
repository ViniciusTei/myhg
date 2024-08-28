'use server'
import { turso } from "@/lib/turso"
import { LibsqlError } from "@libsql/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod"

// Define o schema para a senha
const passwordSchema = z.string()
  .min(4, { message: "A senha deve ter no mínimo 4 caracteres" })
//.regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
//.regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
//.regex(/\d/, { message: "A senha deve conter pelo menos um número" })
//.regex(/[@$!%*?&]/, { message: "A senha deve conter pelo menos um caractere especial (@$!%*?&)" });

// Define o schema para email, senha e confirmação de senha
const userSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], // Mostra o erro em confirmPassword
});

export type CreateUserSchema = z.infer<typeof userSchema>

type Response = {
  error?: any
}

export async function create(prev: any, data: FormData) {
  const rawData: CreateUserSchema = {
    email: data.get('email')?.toString() ?? '',
    password: data.get('password')?.toString() ?? '',
    confirmPassword: data.get('confirmPassword')?.toString() ?? ''
  }
  const response = {} as Response

  // Exemplo de validação
  const result = userSchema.safeParse(rawData);

  if (!result.success) {
    console.log('Schema error:', result.error.format(), rawData)
    response.error = result.error.message;
    return response
  }

  try {
    const rows = await turso().execute({
      sql: "INSERT INTO auth (email, password) VALUES (?, ?)",
      args: [rawData.email, rawData.password],
    })
    console.log('Query success: ', rows)
    if (rows.lastInsertRowid) {
      cookies().set('user.email', rawData.email)
      cookies().set('user.id', rows.lastInsertRowid.toString())
    }
  } catch (err) {
    console.log('Query error: ', err)
    if (err instanceof LibsqlError) {
      response.error = err.message
    } else {
      response.error = JSON.stringify(err, null, 2)
    }
  }

  if (!response.error) {
    redirect('/home')
  }

  return response
}
