import { NavLink, useParams } from "react-router";
import type { Client } from "../interfaces/chat.interface";

interface Props {
  clients: Client[];
}

const ContactList = ({ clients }: Props) => {
  const { id } = useParams();

  const colorIcons = [
    "bg-blue-500",
    "bg-sky-500",
    "bg-cyan-500",
    "bg-teal-500",
    "bg-indigo-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-lime-500",
    "bg-purple-500",
    "bg-violet-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-stone-500",
    "bg-zinc-500",
    "bg-neutral-500",
    "bg-gray-500",
    "bg-slate-500",
    "bg-blue-400",
    "bg-emerald-400",
    "bg-pink-400",
  ];

  const getColorForName = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colorIcons.length;
    return colorIcons[index];
  };


  return (
    <div className="py-3">
      {/* Header */}
      <div className="px-4 mb-2">
        <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
          Mensajes
        </h3>
      </div>

      {/* Lista de contactos */}
      <div className="space-y-1 px-2">
        {clients.map((user) => (
          <NavLink
            to={`/chat/client/${user.id}`}
            key={user.id}
            className={({ isActive,isPending }) =>
              `
              group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 
              ${
                isActive
                  ? "bg-blue-100 ring-1 ring-blue-300 shadow-sm"
                  : "hover:bg-gray-50 active:bg-gray-100"
              }
              ${
                isPending
                  ? "bg-blue-100 ring-1 ring-blue-300 shadow-sm"
                  : "hover:bg-gray-50 active:bg-gray-100"
              }
            `
            }
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className={`h-10 w-10 rounded-full ${getColorForName(
                  user.name
                )} flex items-center justify-center text-white text-sm font-bold shadow-md`}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div
                className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white shadow-sm"
                title="En línea"
              ></div>
            </div>

            {/* Info del contacto */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <span
                  className={`text-sm font-medium truncate ${
                    id === user.id ? "text-blue-700" : "text-gray-900"
                  }`}
                >
                  {user.name}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>

            {/* Detalle lateral (ej. plan actual o fecha) */}
            <div className="text-[11px] text-gray-400 group-hover:text-gray-500 whitespace-nowrap">
              {new Date(user.memberSince).getFullYear()}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
