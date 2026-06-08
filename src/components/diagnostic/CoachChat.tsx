'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, User, Bot, ArrowLeft } from 'lucide-react';

// ============================================================
// TYPES
// ============================================================

interface Message {
  role: 'coach' | 'user';
  content: string;
  timestamp: number;
}

interface CoachChatProps {
  /** Contexte du questionnaire (20 réponses) */
  questionnaireContext: string;
  /** Email du prospect */
  userEmail: string;
  /** Prénom du prospect */
  userName: string;
  /** Fermeture du chat */
  onClose: () => void;
}

// ============================================================
// COACH CHAT
// ============================================================

export default function CoachChat({ questionnaireContext, userEmail, userName, onClose }: CoachChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'coach',
      content: `Bonjour ${userName || 'dirigeant'}. J'ai analysé vos réponses au diagnostic. J'aimerais approfondir avec vous.`,
      timestamp: Date.now(),
    },
    {
      role: 'coach',
      content: `Quel est selon vous le principal frein qui vous empêche d'atteindre vos objectifs commerciaux aujourd'hui ?`,
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/diagnostic/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          context: questionnaireContext,
          email: userEmail,
          name: userName,
          history: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();

      const coachMsg: Message = {
        role: 'coach',
        content: data.response || 'Je réfléchis...',
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, coachMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'coach',
          content: 'Je n\'ai pas pu traiter votre message. Pouvez-vous reformuler ?',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-blue-ink px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-mint-green/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-mint-green" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Sales Coach</div>
            <div className="text-white/50 text-xs">Analyse commerciale</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[400px] overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'coach' ? 'bg-blue-ink/5' : 'bg-mint-green/10'
              }`}>
                {msg.role === 'coach' ? (
                  <Bot className="w-3.5 h-3.5 text-blue-ink" />
                ) : (
                  <User className="w-3.5 h-3.5 text-mint-green" />
                )}
              </div>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                msg.role === 'coach'
                  ? 'bg-white text-gray-700 border border-gray-100 shadow-sm'
                  : 'bg-blue-ink text-white'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-400 text-sm ml-10"
          >
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Échangez avec votre Sales Coach..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-ink/20 focus:border-blue-ink disabled:bg-gray-50 disabled:text-gray-400"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-blue-ink hover:bg-blue-ink/90 disabled:bg-gray-200 text-white rounded-lg flex items-center justify-center transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
