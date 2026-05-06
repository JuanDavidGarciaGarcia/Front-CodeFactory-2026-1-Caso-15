"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

export default function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Token de verificación no encontrado.");
      return;
    }

    apiClient.auth
      .post("/auth/verify-email", { token })
      .then(() => {
        setStatus("success");
        setMessage("¡Email verificado exitosamente! Ya puedes iniciar sesión.");
        setTimeout(() => router.push("/login"), 3000);
      })
      .catch(() => {
        setStatus("error");
        setMessage("El token es inválido o ya expiró.");
      });
  }, [searchParams, router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <div className="max-w-sm w-full text-center space-y-4">
        {status === "loading" && (
          <>
            <div className="w-10 h-10 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Verificando tu email...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-5xl">✅</div>
            <h1 className="text-2xl font-bold text-foreground">¡Cuenta verificada!</h1>
            <p className="text-muted-foreground">{message}</p>
            <p className="text-sm text-muted-foreground">Redirigiendo al login...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-5xl">❌</div>
            <h1 className="text-2xl font-bold text-foreground">Error de verificación</h1>
            <p className="text-muted-foreground">{message}</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 px-4 py-2 bg-primary-green text-white rounded-lg"
            >
              Ir al login
            </button>
          </>
        )}
      </div>
    </div>
  );
}