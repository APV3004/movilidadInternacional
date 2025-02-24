"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon } from "@components/Icons";

export default function Login() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Evita el error de hidratación

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://amused-danya-hugobarea-b3e72b1a.koyeb.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const result: { token: string } = await response.json(); // Tipado del resultado
        localStorage.setItem("jwt", result.token);
        alert("¡Inicio de sesión exitoso!");
        router.push("/dashboard"); // Redirige a la página principal después del login
      } else if (response.status === 404 || response.status === 401) {
        alert("Error: Credenciales incorrectas.");
      } else {
        alert("Ocurrió un problema. Inténtalo más tarde.");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      alert("Hubo un problema al iniciar sesión.");
    }
  };

  return (
    <div className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative font-[Montserrat]" style={{ backgroundImage: "url('/fondo1.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute top-[20px] right-[40px] text-white text-[18px]">
        <span className="font-semibold">Español</span> <span className="font-medium">| English</span>
      </div>
      <form className="relative bg-white rounded-[40px] flex flex-col p-0 w-[540px] h-[510px] shadow-lg font-[Montserrat] items-start" onSubmit={handleSubmit}>
        <div className="absolute top-[55px] left-[40px]">
          <img src="/logoblanco.jpg" alt="Logo" className="w-[186px] h-[55px]" />
        </div>
        <div className="flex flex-col items-center w-full mt-[145px] gap-[25px]">
          <h2 className="text-[32px] font-bold text-[#0065EF] text-center">INICIO DE SESIÓN</h2>
          <input
            className="w-[420px] h-[44px] p-[10px_20px] border-[1.5px] border-black rounded-[25px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-[18px]"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative w-[420px] flex items-center mt-[2px]">
            <input
              className="w-full h-[44px] p-[10px_20px] border-[1.5px] border-black rounded-[25px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-[18px]"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-[15px] flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeIcon />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between w-[420px] mt-[29px] mx-auto px-[10px]">
          <label className="flex items-center space-x-[9px]">
            <input type="checkbox" className="form-checkbox text-blue-600" />
            <span className="text-black text-[18px]">Recuérdame</span>
          </label>
          <a href="#" className="text-black underline text-[18px]">Olvidé mi contraseña</a>
        </div>
        <div className="flex justify-center w-full mt-[27px]">
          <button className="w-[222px] h-[43px] bg-[#0065EF] text-white text-[18px] font-medium py-2 rounded-[23px] hover:bg-blue-700 transition">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}
