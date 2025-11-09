import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { data, Form, Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types/login-page";
import { commitSession, getSession } from "~/sessions.server";
import { redirect } from "react-router";
import { Toaster, toast } from "react-hot-toast";
import { loginUser } from "~/fake/fake-data";
export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.get("userId")) {
    return redirect("/chat");
  }

  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  // Validación básica
  if (!email || !password) {
    session.flash("error", "Por favor completa todos los campos");
    // return redirect("/auth/login", {
    //   headers: {
    //     "Set-Cookie": await commitSession(session),
    //   },
    // });
    return data(
      { error: "Por favor completa todos los campos" },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  const user = await loginUser()


  // Login exitoso
  session.set("userId", user.id);
  session.set("token", user.token);
  session.set("name", user.name);

  return redirect("/chat", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

const LoginPage = ({ actionData }: Route.ComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setLoading(false);
    }
      }, [actionData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 via-white to-neutral-200 px-4">
       
       <Toaster position="top-right" reverseOrder={false} />

      <Form
        method="post"
        onSubmit={() => setLoading(true)}
        className="relative w-full max-w-sm md:max-w-md bg-white/80 backdrop-blur-xl border border-neutral-200/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]"
      >
        {/* Logo o encabezado */}
        <div className="text-center mb-10">
          <div className="text-3xl font-semibold tracking-tight text-neutral-900">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-500">
              Bienvenido
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-2">
            Inicia sesión para continuar
          </p>
        </div>

        {/* Mostrar error si existe */}
        {actionData?.error && (
          <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">{actionData.error}</p>
          </div>
        )}

        {/* Campos de entrada - AHORA HABILITADOS */}
        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-neutral-700">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="tu@correo.com"
           
              className="h-11 rounded-xl border-neutral-200 focus-visible:ring-neutral-400 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-neutral-700">
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
               
                className="h-11 rounded-xl border-neutral-200 pr-10 focus-visible:ring-neutral-400 focus-visible:ring-offset-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Botón de login con formulario */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Iniciar sesión
        </Button>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-neutral-500">
          ¿No tienes cuenta?{" "}
          <Link
            to="/auth/register"
            className="text-neutral-900 font-medium hover:underline underline-offset-4"
          >
            Crear una
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
