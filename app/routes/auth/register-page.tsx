import { Label } from "@radix-ui/react-label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 via-white to-neutral-200 px-4">
      <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg bg-white/80 backdrop-blur-xl border border-neutral-200/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-500">
              Crear cuenta
            </span>
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Únete y empieza tu experiencia
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-sm text-neutral-700">
              Nombre completo
            </Label>
            <Input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              className="h-11 w-full rounded-xl border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-neutral-900 transition"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-neutral-700">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              className="h-11 w-full rounded-xl border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-neutral-900 transition"
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
                placeholder="••••••••"
                className="h-11 w-full rounded-xl border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-neutral-900 transition pr-10"
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

          <Button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full h-11 rounded-xl bg-neutral-900 text-white font-medium hover:bg-neutral-800 active:bg-neutral-950 transition-all flex items-center justify-center gap-2"
          >
            {loading && <span className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />}
            Registrarse
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-neutral-500">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/auth/login"
            className="text-neutral-900 font-medium hover:underline underline-offset-4"
          >
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
