import { IUser } from "@/types/user";
import { toBase64 } from "@/utils/toBase64";
import { FormProvider, useForm } from "react-hook-form";

export const Demo1 = () => {
  const methods = useForm<IUser>({
    defaultValues: {
      // email: "@example.com",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = methods;

  console.log(errors);

  const onSubmit = (data: IUser) => {
    // console.log(data.image);
    console.log(data);

    alert("Enviando datos...");
    // setValue("email" , '')

    reset();
    // antes de enviar
    // fetch o axios
  };

  return (
    <div className="bg-indigo-50 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg bg-white w-full p-4 rounded-md">
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Nombre */}
            <label htmlFor="name">Nombre</label>
            <input
              className="border outline-none rounded-md py-1 px-4"
              type="text"
              {...register("name", {
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
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}

            {/* Correo */}
            <label htmlFor="email">Correo</label>
            <input
              className="border outline-none rounded-md py-1 px-4"
              type="email"
              {...register("email", {
                required: { value: true, message: "Correo es requerido" },
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: "Correo no es válido",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}

            {/* Contraseña */}
            <label htmlFor="password">Contraseña</label>
            <input
              className="border outline-none rounded-md py-1 px-4"
              type="password"
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
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}

            {/* Confirmar Contraseña */}
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              className="border outline-none rounded-md py-1 px-4"
              type="password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirmar contraseña es requerido",
                },
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}

            {/* Fecha de Nacimiento */}
            <label htmlFor="birthdate">Fecha de Nacimiento</label>
            <input
              className="border outline-none rounded-md py-1 px-4"
              type="date"
              {...register("birthdate", {
                required: {
                  value: true,
                  message: "Fecha de nacimiento es requerida",
                },
                validate: (value) => {
                  // console.log(value);
                  const birthdate = new Date(value);
                  const currentDate = new Date();
                  const age =
                    currentDate.getFullYear() - birthdate.getFullYear();
                  // console.log(age);
                  return age >= 18 || "Debe ser mayor de edad";
                },
              })}
            />
            {errors.birthdate && (
              <span className="text-red-600">{errors.birthdate.message}</span>
            )}

            {/* Pais */}
            <label htmlFor="country">País</label>
            <select
              className="border outline-none rounded-md py-1 px-4"
              {...register("country")}
            >
              <option value="pe">Perú</option>
              <option value="co">Colombia</option>
              <option value="ar">Argentina</option>
            </select>

            {watch("country") === "pe" && (
              <>
                <input
                  className="border outline-none rounded-md py-1 px-4"
                  type="text"
                  placeholder="Departamento"
                  {...register("department", {
                    required: {
                      value: true,
                      message: "Departamento requerido",
                    },
                  })}
                />
                {errors.department && (
                  <span className="text-red-600">
                    {errors.department.message}
                  </span>
                )}
              </>
            )}

            {/* File */}
            <label htmlFor="image">Imagen</label>
            <input
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const base64 = await toBase64(file);
                  setValue("image", base64);
                } else {
                  setValue("image", "");
                }
              }}
              // onChange={(e) => {
              //   // console.log(e.target.files[0]);
              //   setValue("image", e.target.files[0].name);
              // }}
            />

            {/* Terminos y condiciones */}
            <div className="flex items-center justify-between">
              <label htmlFor="terms">Acepto términos y condiciones</label>
              <input
                type="checkbox"
                {...register("terms", {
                  required: {
                    value: true,
                    message: "Debe aceptar términos y condiciones",
                  },
                })}
              />
            </div>
            {errors.terms && (
              <span className="text-red-600">{errors.terms.message}</span>
            )}

            <button className="border rounded-md py-1" type="submit">
              Enviar
            </button>
            <pre>{JSON.stringify(watch(), null, 2)}</pre>
            {/* <pre>{JSON.stringify(watch("password"), null, 2)}</pre> */}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
