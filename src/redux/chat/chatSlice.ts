import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Conversation, Message } from '@/types';
import { conversations as mockConversations, messages as mockMessages } from '@/data';
import type { RootState } from '../store';

interface ChatState {
  conversations: Conversation[];
  messages: Message[];
  activeConversationId: string | null;
  isTyping: boolean;
}

const initialState: ChatState = {
  conversations: mockConversations,
  messages: mockMessages,
  activeConversationId: mockConversations[0]?.id ?? null,
  isTyping: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload;
      if (action.payload) {
        const conv = state.conversations.find((c) => c.id === action.payload);
        if (conv) {
          Object.keys(conv.unreadCount).forEach((userId) => {
            conv.unreadCount[userId] = 0;
          });
        }
      }
    },
    sendMessage: (state, action: PayloadAction<{ conversationId: string; senderId: string; content: string }>) => {
      const { conversationId, senderId, content } = action.payload;
      const message: Message = {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId,
        content,
        createdAt: new Date().toISOString(),
        isRead: false,
      };
      state.messages.push(message);

      const conv = state.conversations.find((c) => c.id === conversationId);
      if (conv) {
        conv.lastMessage = content;
        conv.lastMessageAt = message.createdAt;
      }
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
  },
});

export const { setActiveConversation, sendMessage, setTyping } = chatSlice.actions;

export const selectConversations = (state: RootState) => state.chat.conversations;
export const selectActiveConversationId = (state: RootState) => state.chat.activeConversationId;
export const selectActiveConversation = (state: RootState) =>
  state.chat.conversations.find((c) => c.id === state.chat.activeConversationId);

export const selectConversationMessages = (conversationId: string) => (state: RootState) =>
  state.chat.messages
    .filter((m) => m.conversationId === conversationId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

export const selectUserConversations = (userId: string) => (state: RootState) =>
  state.chat.conversations.filter((c) => c.participantIds.includes(userId));

export default chatSlice.reducer;
