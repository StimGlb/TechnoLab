# 🔗 Intégration Frontend ↔️ Backend

Ce guide explique comment connecter ton frontend React (TechnoKit/TechnoLab) avec le backend Node.js.

---

## 📦 1. Installation des dépendances frontend

Dans ton dossier `client/`, ajoute Axios pour les requêtes HTTP :

```bash
cd client
npm install axios
```

---

## 🔧 2. Configuration de l'URL du backend

### Méthode 1 : Variable d'environnement (Recommandé)

Crée `.env` dans `client/` :

```env
VITE_API_URL=http://localhost:3001
```

En production (Vercel), ajoute cette variable dans les settings du projet.

### Méthode 2 : Fichier de config

Crée `client/src/config/api.ts` :

```typescript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

---

## 🚀 3. Service API pour TechnoChat

Crée `client/src/services/chatService.ts` :

```typescript
import axios from 'axios';
import { API_URL } from '../config/api';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 secondes (Claude peut prendre du temps)
});

// ========================================
// TYPES
// ========================================

export interface Conversation {
  id: string;
  titre: string;
  contexte?: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id?: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}

// ========================================
// API CALLS
// ========================================

export const chatService = {
  /**
   * Créer une nouvelle conversation
   */
  async createConversation(titre: string, contexte?: string): Promise<Conversation> {
    const response = await api.post('/chat/conversations', { titre, contexte });
    return response.data.conversation;
  },

  /**
   * Récupérer toutes les conversations
   */
  async getAllConversations(): Promise<Conversation[]> {
    const response = await api.get('/chat/conversations');
    return response.data.conversations;
  },

  /**
   * Récupérer une conversation avec son historique
   */
  async getConversation(id: string): Promise<ConversationWithMessages> {
    const response = await api.get(`/chat/conversations/${id}`);
    return response.data.conversation;
  },

  /**
   * Envoyer un message dans une conversation
   */
  async sendMessage(conversationId: string, message: string): Promise<Message> {
    const response = await api.post(`/chat/conversations/${conversationId}/messages`, {
      message,
    });
    return response.data.message;
  },

  /**
   * Supprimer une conversation
   */
  async deleteConversation(id: string): Promise<void> {
    await api.delete(`/chat/conversations/${id}`);
  },

  /**
   * Effacer l'historique d'une conversation
   */
  async clearHistory(id: string): Promise<void> {
    await api.delete(`/chat/conversations/${id}/history`);
  },

  /**
   * Vérifier la santé du backend
   */
  async healthCheck(): Promise<{ status: string; database: string }> {
    const response = await api.get('/health');
    return response.data;
  },
};
```

---

## 🎨 4. Composant TechnoChat (exemple)

Crée `client/src/components/TechnoChat.tsx` :

```typescript
import { useState, useEffect, useRef } from 'react';
import { chatService, type Message } from '../services/chatService';

export default function TechnoChat() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Créer une conversation au montage
  useEffect(() => {
    createNewConversation();
  }, []);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const createNewConversation = async () => {
    try {
      const conv = await chatService.createConversation(
        'Nouvelle conversation',
        'Assistant pédagogique Technologie'
      );
      setConversationId(conv.id);
      setMessages([]);
    } catch (error) {
      console.error('Erreur création conversation:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !conversationId || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const assistantMessage = await chatService.sendMessage(
        conversationId,
        inputMessage
      );
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erreur envoi message:', error);
      // Afficher un message d'erreur à l'utilisateur
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto border rounded-lg bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="border-b p-4 flex justify-between items-center bg-indigo-600 text-white rounded-t-lg">
        <h2 className="text-xl font-bold">💬 TechnoChat</h2>
        <button
          onClick={createNewConversation}
          className="px-3 py-1 bg-white text-indigo-600 rounded hover:bg-gray-100 text-sm"
        >
          Nouvelle conversation
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p>👋 Bonjour ! Pose-moi une question sur la Technologie au collège.</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(msg.timestamp).toLocaleTimeString('fr-FR')}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
              <span className="animate-pulse">Claude réfléchit...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t p-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Tape ton message..."
            disabled={loading}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '...' : 'Envoyer'}
          </button>
        </div>
      </form>
    </div>
  );
}
```

---

## 🔌 5. Intégrer dans App.tsx

Modifie ton `App.tsx` pour ajouter TechnoChat :

```typescript
import TechnoChat from './components/TechnoChat';

export default function App() {
  return (
    <div className="min-h-dvh bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* ... ton header existant ... */}

      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Nouveau composant TechnoChat */}
        <section className="mb-8">
          <TechnoChat />
        </section>

        {/* ... le reste de ton contenu ... */}
      </main>
    </div>
  );
}
```

---

## 🧪 6. Tester l'intégration

### Backend
```bash
cd server
npm run dev
```

### Frontend
```bash
cd client
npm run dev
```

Ouvre http://localhost:5173 et teste TechnoChat !

---

## 🐛 7. Gestion des erreurs

Ajoute un intercepteur Axios pour gérer les erreurs globalement :

```typescript
// Dans chatService.ts

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erreur du serveur (4xx, 5xx)
      console.error('Erreur API:', error.response.data);
      
      if (error.response.status === 429) {
        alert('Trop de requêtes. Patiente un peu 😊');
      } else if (error.response.status === 500) {
        alert('Erreur serveur. Réessaie plus tard.');
      }
    } else if (error.request) {
      // Pas de réponse du serveur
      console.error('Serveur injoignable:', error.request);
      alert('Impossible de contacter le serveur. Vérifie qu\'il tourne !');
    }
    return Promise.reject(error);
  }
);
```

---

## 📱 8. Mode sombre

TechnoChat est déjà prévu pour le mode sombre avec `dark:` classes Tailwind !

---

## ✅ Checklist finale

Avant de tester :

- [ ] Backend lancé sur `http://localhost:3001`
- [ ] Frontend lancé sur `http://localhost:5173`
- [ ] Variable `VITE_API_URL` configurée
- [ ] `ANTHROPIC_API_KEY` renseignée dans backend `.env`
- [ ] CORS configuré dans backend (origine frontend)
- [ ] Axios installé dans frontend (`npm i axios`)

---

## 🚀 Prochaines étapes

Une fois l'intégration fonctionnelle :

1. **Ajouter la liste des conversations** (sidebar)
2. **Sauvegarder le contexte** (niveau, matière, etc.)
3. **Export des réponses** en PDF/HTML
4. **Prompts personnalisés** selon le type de demande
5. **Mode streaming** pour les longues réponses

Tout est prêt pour que ton TechnoChat prenne vie ! 🎉