"use client";

import { FormProvider, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const defaultValues = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function LoginPage() {
  const router = useRouter();

  const methods = useForm({
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = methods;

  // console.log(errors);

  const onSubmit = async (data: typeof defaultValues) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    // if (res?.error) return setError(res.error as string);
    if (res?.ok) return router.push("/dashboard/profile");
    router.refresh();
    console.log(res);
  };

  return (
    <div className="bg-indigo-50 h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="max-w-lg bg-white w-full p-4 rounded-md">
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl text-center pb-8">Iniciar sesión</h1>

            {/* Correo */}
            <label htmlFor="email">Correo</label>
            <input
              className="border outline-none rounded-md py-1 px-4"
              type="email"
              placeholder="example@gmail.com"
              {...register("email", {
                required: { value: true, message: "Correo es requerido" },
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: "Correo no es válido",
                },
              })}
            />
            {!!errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}

            {/* Contraseña */}
            <label htmlFor="password">Contraseña</label>
            <input
              className="border outline-none rounded-md py-1 px-4"
              type="password"
              placeholder="****************"
              {...register("password", {
                required: {
                  value: true,
                  message: "Contraseña es requerido",
                },
                minLength: {
                  value: 6,
                  message: "Password debe tener al menos 6 caracteres",
                },
              })}
            />
            {!!errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}

            <button
              onClick={() =>
                toast.success("¡Acceso Exitoso!", { theme: "dark" })
              }
              className="border rounded-md py-1 mt-6"
              type="submit"
            >
              Ingresar
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
