"use client";

import {
  Bot,
  ExternalLink,
  MessageCircle,
  Send,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  chatbotFaqs,
  chatbotQuickReplies,
  type ChatbotAction,
} from "@/data/chatbot-faq";

interface ChatMessage {
  id: number;
  sender: "bot" | "user";
  text: string;
  action?: ChatbotAction;
}

const initialMessage: ChatMessage = {
  id: 1,
  sender: "bot",
  text:
    "Hello! I am the PixelHiven assistant. How can I help you today?",
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findAnswer(message: string) {
  const normalizedMessage = normalizeText(message);

  let bestMatch:
    | {
        score: number;
        answer: string;
        action?: ChatbotAction;
      }
    | undefined;

  for (const faq of chatbotFaqs) {
    let score = 0;

    for (const keyword of faq.keywords) {
      const normalizedKeyword = normalizeText(keyword);

      if (normalizedMessage.includes(normalizedKeyword)) {
        score += normalizedKeyword.includes(" ") ? 4 : 2;
      } else {
        const words = normalizedKeyword.split(" ");

        for (const word of words) {
          if (word.length >= 4 && normalizedMessage.includes(word)) {
            score += 1;
          }
        }
      }
    }

    if (!bestMatch || score > bestMatch.score) {
      bestMatch = {
        score,
        answer: faq.answer,
        action: faq.action,
      };
    }
  }

  if (bestMatch && bestMatch.score >= 2) {
    return {
      answer: bestMatch.answer,
      action: bestMatch.action,
    };
  }

  return {
    answer:
      "I could not find a precise answer to that question. Please try asking about delivery, payments, downloads, warranties, refunds, licenses, or accounts. For order-specific help, contact our support team.",
    action: {
      label: "Contact support",
      href: "/contact",
    },
  };
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(2);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [isOpen, messages]);

  useEffect(() => {
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const sendMessage = (rawMessage: string) => {
    const message = rawMessage.trim().slice(0, 500);

    if (!message) {
      return;
    }

    const userMessage: ChatMessage = {
      id: nextIdRef.current++,
      sender: "user",
      text: message,
    };

    const result = findAnswer(message);

    const botMessage: ChatMessage = {
      id: nextIdRef.current++,
      sender: "bot",
      text: result.answer,
      action: result.action,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleInputKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <section
          role="dialog"
          aria-label="PixelHiven support assistant"
          aria-modal="false"
          className="fixed bottom-20 left-4 right-4 z-[70] flex max-h-[min(680px,calc(100vh-6rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:bottom-24 sm:left-6 sm:right-auto sm:w-[390px]"
        >
          <header className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-4 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-bold">
                  PixelHiven Assistant
                </h2>

                <p className="flex items-center gap-1.5 text-xs text-indigo-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Automated support
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close support assistant"
              className="rounded-lg p-2 transition hover:bg-white/15"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div className="border-b border-gray-100 bg-indigo-50 px-4 py-2.5 text-xs leading-5 text-indigo-900">
            <div className="flex gap-2">
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
                aria-hidden="true"
              />
              <p>
                Never share passwords, full license keys, banking details, or
                private keys in this chat.
              </p>
            </div>
          </div>

          <div
            className="flex-1 space-y-4 overflow-y-auto bg-gray-50/70 p-4"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.sender === "user"
                    ? "flex-row-reverse"
                    : "flex-row"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.sender === "bot"
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <Bot className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <User className="h-4 w-4" aria-hidden="true" />
                  )}
                </div>

                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.sender === "bot"
                      ? "rounded-tl-md border border-gray-200 bg-white text-gray-700"
                      : "rounded-tr-md bg-indigo-600 text-white"
                  }`}
                >
                  <p>{message.text}</p>

                  {message.action && (
                    <Link
                      href={message.action.href}
                      onClick={() => setIsOpen(false)}
                      className="mt-3 inline-flex items-center gap-1.5 font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      {message.action.label}
                      <ExternalLink
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Popular questions
                </p>

                <div className="flex flex-wrap gap-2">
                  {chatbotQuickReplies.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => sendMessage(reply)}
                      className="rounded-full border border-indigo-200 bg-white px-3 py-2 text-left text-xs font-medium text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-50"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 bg-white p-3"
          >
            <div className="flex items-center gap-2">
              <label htmlFor="chatbot-message" className="sr-only">
                Ask a question
              </label>

              <input
                ref={inputRef}
                id="chatbot-message"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                maxLength={500}
                autoComplete="off"
                placeholder="Ask about delivery, payment..."
                className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={
          isOpen
            ? "Close PixelHiven assistant"
            : "Open PixelHiven assistant"
        }
        aria-expanded={isOpen}
        className="fixed bottom-5 left-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-200 sm:bottom-8 sm:left-8 sm:h-14 sm:w-14"
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
