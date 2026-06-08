'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, User, Bot, ArrowLeft } from 'lucide-react';

// ============================================================
// Markdown inline renderer (zéro dépendance)
// ============================================================

function renderMarkdown(text: string): React.ReactNode[] {
  // Échapper le HTML
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Split par lignes
  const lines = escaped.split('\n');
  const nodes: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];

  lines.forEach((line, li) => {
    const trimmed = line.trim();

    // Ligne vide → fermer la liste
    if (!trimmed) {
      if (inList) {
        nodes.push(
          <ul key={`list-${li}`} className="list-disc list-inside space-y-1 my-1">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }
      return;
    }

    // Item de liste
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      inList = true;
      const content = trimmed.slice(2);
      listItems.push(
        <li key={`li-${li}`} className="text-sm text-gray-700 leading-relaxed">
          {renderInline(content)}
        </li>
      );
      return;
    }

    // Ligne normale
    if (inList) {
      nodes.push(
        <ul key={`list-${li}`} className="list-disc list-inside space-y-1 my-1">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }

    nodes.push(
      <p key={`p-${li}`} className="text-sm text-gray-700 leading-relaxed mb-1 last:mb-0">
        {renderInline(trimmed)}
      </p>
    );
  });

  // Fermer la dernière liste
  if (inList && listItems.length > 0) {
    nodes.push(
      <ul key="list-end" className="list-disc list-inside space-y-1 my-1">
        {listItems}
      </ul>
    );
  }

  return nodes;
}

function renderInline(text: string): React.ReactNode[] {
  // Patterns : **gras**, *italique*
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Texte avant le match
    if (match.index > lastIdx) {
      parts.push(<span key={key++}>{text.slice(lastIdx, match.index)}</span>);
    }

    if (match[2]) {
      parts.push(<strong key={key++} className="font-semibold text-blue-ink">{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={key++} className="italic text-gray-600">{match[3]}</em>);
    }

    lastIdx = match.index + match[0].length;
  }

  // Reste du texte
  if (lastIdx < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIdx)}</span>);
  }

  return parts;
}

// ============================================================
// TYPES
// ============================================================

interface Message {
  role: 'coach' | 'user';
  content: string;
  timestamp: number;
}

interface CoachChatProps {
  questionnaireContext: string;
  userEmail: string;
  userName: string;
  onClose: () => void;
}

// ============================================================
// Bubble de message
// ============================================================

function MessageBubble({ msg }: { msg: Message }) {
  const isCoach = msg.role === 'coach';
  const rendered = useMemo(() => isCoach ? renderMarkdown(msg.content) : msg.content, [msg.content, isCoach]);

  return (
    <div className={`flex items-start gap-3 ${isCoach ? '' : 'flex-row-reverse'}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
        isCoach ? 'bg-blue-ink/5' : 'bg-mint-green/10'
      }`}>
        {isCoach ? (
          <Bot className="w-3.5 h-3.5 text-blue-ink" />
        ) : (
          <User className="w-3.5 h-3.5 text-mint-green" />
        )}
      </div>
      {isCoach ? (
        <div className="max-w-[85%] px-4 py-2.5 rounded-xl bg-white text-gray-700 border border-gray-100 shadow-sm text-sm">
          {rendered}
        </div>
      ) : (
        <div className="max-w-[80%] px-4 py-2.5 rounded-xl bg-blue-ink text-white text-sm">
          {msg.content}
        </div>
      )}
    </div>
  );
}

// ============================================================
// COACH CHAT
// ============================================================

export default function CoachChat({ questionnaireContext, userEmail, userName, onClose }: CoachChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'coach',
      content: `Parlez-moi de votre situation : qu'est-ce qui vous amène aujourd'hui ?`,
      timestamp: Date.now(),
    },
  ]);
  const [hasStarted, setHasStarted] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const startCoaching = async () => {
    if (!input.trim() || isLoading) return;
    setHasStarted(true);

    const userMsg: Message = { role: 'user', content: input.trim(), timestamp: Date.now() };
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
          history: [],
        }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: 'coach', content: data.response || 'Je réfléchis...', timestamp: Date.now(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'coach', content: 'Je n\'ai pas pu analyser votre message. Pouvez-vous reformuler ?', timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    if (!hasStarted) { startCoaching(); return; }

    const userMsg: Message = { role: 'user', content: input.trim(), timestamp: Date.now() };
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
          history: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: 'coach', content: data.response || 'Je réfléchis...', timestamp: Date.now(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'coach', content: 'Je n\'ai pas pu traiter votre message. Pouvez-vous reformuler ?', timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
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
      <div className="h-[420px] overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageBubble msg={msg} />
            </motion.div>
          ))}
        </AnimatePresence>

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
