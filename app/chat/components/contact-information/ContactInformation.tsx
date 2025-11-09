import type { Client } from "~/chat/interfaces/chat.interface";
import { Button } from "~/components/ui/button";
import { formatDate } from "~/lib/data.formatter";

interface Props {
  client: Client;
}

export const ContactInformation = ({ client }: Props) => {
  const infoIncompleta =
    !client.email ||
    !client.phone ||
    !client.currentPlan ||
    !client.memberSince;

  const getColorForName = (name: string) => {
    const colors = [
      "bg-blue-600",
      "bg-purple-600",
      "bg-pink-600",
      "bg-indigo-600",
      "bg-cyan-600",
      "bg-teal-600",
      "bg-emerald-600",
      "bg-violet-600",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex flex-col items-center p-6 pb-5 border-b border-gray-200">
        <div className="relative mb-4">
          <div
            className={`h-24 w-24 rounded-full ${getColorForName(
              client.name
            )} flex items-center justify-center text-white text-3xl font-semibold`}
          >
            {client.name.charAt(0).toUpperCase()}
          </div>
          <div className="absolute bottom-1 right-1 h-5 w-5 bg-green-500 rounded-full border-[3px] border-white"></div>
        </div>
        <h3 className="font-semibold text-lg text-gray-900 mb-0.5">
          {client.name}
        </h3>
        {client.currentPlan && (
          <p className="text-sm text-gray-600 font-medium">
            {client.currentPlan}
          </p>
        )}
      </div>

      {/* Content scrolleable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Contacto */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3.5">
              Contacto
            </h4>
            {infoIncompleta ? (
              <p className="text-sm text-gray-500">Información no disponible</p>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Email</span>
                  <span className="text-sm text-gray-900 font-medium text-right truncate ml-4">
                    {client.email}
                  </span>
                </div>
                <div className="h-px bg-gray-100"></div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Teléfono</span>
                  <span className="text-sm text-gray-900 font-medium">
                    {client.phone}
                  </span>
                </div>
                <div className="h-px bg-gray-100"></div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">ID</span>
                  <span className="text-sm text-gray-900 font-mono font-medium">
                    #{client.id}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Cuenta */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3.5">
              Cuenta
            </h4>
            {infoIncompleta ? (
              <p className="text-sm text-gray-500">Información no disponible</p>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Miembro desde</span>
                  <span className="text-sm text-gray-900 font-medium">
                    {formatDate(client.memberSince)}
                  </span>
                </div>
                | <div className="h-px bg-gray-100"></div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Última factura</span>
                  <span className="text-sm text-gray-900 font-semibold">
                    {formatDate(client.memberSince)}
                  </span>
                </div>
                <div className="h-px bg-gray-100"></div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Estado</span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-green-700 font-medium">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    Activo
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 pt-4 border-t border-gray-200 bg-white">
        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium h-11 rounded-lg transition-colors">
          Ver perfil completo
        </Button>
      </div>
    </div>
  );
};
