import type { Route } from "./+types/home";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Support Chat" },
    { name: "description", content: "Sistema de soporte con React Router" },
  ];
}

export function loader() {
  return redirect("/auth/login"); 
}

export default function Home() {
  return null; 
}
