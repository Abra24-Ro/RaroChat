import type { Route } from "./+types/home";
import { redirect } from "react-router";
import { getSession } from "~/sessions.server"; // importa tu sesión

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (userId) {
    // si hay sesión activa → lleva al chat
    return redirect("/chat");
  }

  // si no hay sesión → lleva al login
  return redirect("/auth/login");
}

export default function Home() {
  return null;
}
