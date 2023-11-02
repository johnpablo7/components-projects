"use client";

import { AuthService } from "@/services/auth";
import { FormProvider, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { EMAIL_ALREADY_EXISTS } from "@/constants/error-codes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const defaultValues = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const router = useRouter();

  const methods = useForm({
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = methods;

  // console.log(errors);

  const onSubmit = async (data: typeof defaultValues) => {
    console.log(data);

    try {
      const signupResponse = await AuthService.signup(data);
      console.log(signupResponse);
      reset();

      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) return router.push("/dashboard");

      console.log(res);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        let message = error.response?.data.message;

        if (error.response?.data.code === EMAIL_ALREADY_EXISTS) {
          setError("email", { message });
        } else {
          toast.error(message);
        }
      }
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-lg bg-white w-full p-4 rounded-md">
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl text-center pb-8">Registro</h1>

            {/* Nombre Completo */}
            <label htmlFor="fullname">Nombre Completo</label>
            <input
              className="border outline-none rounded-md py-1 px-4"
              type="text"
              placeholder="John Doe"
              {...register("fullname", {
                required: {
                  value: true,
                  message: "Nombre es requerido",
                },
                minLength: {
                  value: 2,
                  message: "Nombre debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "Nombre debe tener máximo 20 caracteres",
                },
              })}
            />
            {!!errors.fullname && (
              <span className="text-red-600">{errors.fullname.message}</span>
            )}

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

            {/* Confirmar Contraseña */}
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              className="border outline-none rounded-md py-1 px-4"
              type="password"
              placeholder="****************"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirmar contraseña es requerido",
                },
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              })}
            />
            {!!errors.confirmPassword && (
              <span className="text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}

            <button
              onClick={() =>
                toast.success("¡Registro Exitoso!", { theme: "dark" })
              }
              className="border rounded-md py-1 mt-6"
              type="submit"
            >
              Registrarse
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
