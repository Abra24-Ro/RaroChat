
import { MessageSquare } from "lucide-react";

export const NotContactSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center bg-gray-50">
      {/* Ícono */}
      <div className="h-20 w-20 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mt-2 mb-6 shadow-sm">
        <MessageSquare className="h-9 w-9 text-gray-700" strokeWidth={1.5} />
      </div>

      {/* Título */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Ningún contacto seleccionado
      </h2>

      {/* Subtítulo */}
      <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
        Selecciona un contacto de la lista para ver su información y comenzar una conversación.
      </p>
    </div>
  );
};