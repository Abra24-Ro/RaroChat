import { Bot, Copy, Send, ThumbsDown, ThumbsUp, User, Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useRef, useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import type { Route } from "./+types/client-chat-page";
import { getClientMessages } from "~/fake/fake-data";
import { Form, useNavigation } from "react-router";
import { sendMessage } from "~/fake/fake-data";

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  const messages = await getClientMessages(id);
  return { messages };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const message = formData.get("message");
  const option = formData.get("option") as "agent" | "client";
  
  if (!message || typeof message !== "string" || !message.trim()) {
    return { error: "El mensaje no puede estar vacío" };
  }
  
  await sendMessage({
    sender: option,
    content: message,
    clientId: params.id,
    createdAt: new Date(),
  });
  
  return { success: true };
}

const ClientChatPage = ({ loaderData }: Route.ComponentProps) => {
  const [input, setInput] = useState("");
  const [option, setOption] = useState<"agent" | "client">("agent");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  
  const { messages = [] } = loaderData ?? {};
  const isSubmitting = navigation.state === "submitting";

  const handleCopy = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = () => {
    if (canSubmit) {
      formRef.current?.requestSubmit();
      // Limpiar después de enviar
      setTimeout(() => {
        setInput("");
        const textarea = formRef.current?.querySelector("textarea");
        if (textarea) {
          textarea.style.height = "auto";
          textarea.focus();
        }
      }, 0);
    }
  };

  const canSubmit = input.trim().length > 0 && !isSubmitting;

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-white h-full">
      {/* Chat messages */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="px-4 md:px-6 py-8">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>
                  <Bot className="h-16 w-16 text-blue-500 mx-auto relative" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-gray-700 text-base font-medium">No hay mensajes aún</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Comienza una conversación con tu cliente
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <div key={`${message.createdAt}-${index}`} className="w-full">
                  {message.sender === "agent" ? (
                    <div className="flex gap-3 items-start group">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                        <Bot className="h-5 w-5 text-white" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0 max-w-[80%]">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-sm font-semibold text-gray-900">
                            NexBot
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(message.createdAt).toLocaleTimeString('es-ES', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3.5 shadow-sm hover:shadow-md transition-shadow">
                          <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleCopy(message.content, index)}
                            className="h-8 w-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-all"
                            title="Copiar mensaje"
                            type="button"
                          >
                            {copiedIndex === index ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            className="h-8 w-8 rounded-lg hover:bg-green-50 flex items-center justify-center text-gray-400 hover:text-green-600 transition-all"
                            title="Me gustó"
                            type="button"
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </button>
                          <button
                            className="h-8 w-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-600 transition-all"
                            title="No me gustó"
                            type="button"
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end group">
                      <div className="flex flex-col items-end max-w-[80%]">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs text-gray-400">
                            {new Date(message.createdAt).toLocaleTimeString('es-ES', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            Tú
                          </span>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl rounded-tr-md px-4 py-3.5 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-shadow w-fit">
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm px-4 md:px-6 py-5 shrink-0">
        <Form
          ref={formRef}
          method="post"
          className="max-w-4xl mx-auto flex items-end gap-3"
        >
          {/* Toggle buttons para seleccionar remitente */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
            <input type="hidden" name="option" value={option} />
            <button
              type="button"
              onClick={() => setOption("agent")}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                option === "agent"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Bot className="h-4 w-4" />
              Agente
            </button>
            <button
              type="button"
              onClick={() => setOption("client")}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                option === "client"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <User className="h-4 w-4" />
              Cliente
            </button>
          </div>

          {/* Input */}
          <div className="flex-1 relative">
            <Textarea
              placeholder="Escribe un mensaje..."
              value={input}
              name="message"
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              disabled={isSubmitting}
              className="min-h-[52px] max-h-[120px] resize-none rounded-2xl border-2 border-gray-200 bg-white px-5 py-3.5 text-sm placeholder:text-gray-400 focus:ring-0 focus:border-blue-500 hover:border-gray-300 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              rows={1}
            />
            {input.length > 0 && (
              <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                {input.length} caracteres
              </div>
            )}
          </div>

          {/* Botón enviar */}
          <Button
            size="icon"
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="h-[52px] w-[52px] rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shrink-0 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-700 disabled:shadow-lg"
            title="Enviar mensaje"
          >
            <Send className="h-5 w-5" />
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ClientChatPage;