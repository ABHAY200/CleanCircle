import { ArrowLeft, MessageSquare } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { ChatBubble, MessageInput } from '@/components/chat/ChatBubble';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/auth/authSlice';
import {
  selectUserConversations,
  selectActiveConversationId,
  selectActiveConversation,
  selectConversationMessages,
  setActiveConversation,
  sendMessage,
} from '@/redux/chat/chatSlice';
import { cleaners, customers } from '@/data';
import { formatRelativeTime, cn } from '@/utils';
import { AppImage } from '@/components/common/AppImage';

function getParticipantInfo(id: string) {
  const cleaner = cleaners.find((c) => c.id === id);
  if (cleaner) return { name: cleaner.businessName, avatar: cleaner.avatar };
  const customer = customers.find((c) => c.id === id);
  if (customer) return { name: `${customer.firstName} ${customer.lastName}`, avatar: customer.avatar };
  return { name: 'User', avatar: '' };
}

export function MessagesPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userId = user?.id ?? 'demo-customer';
  const conversations = useAppSelector(selectUserConversations(userId));
  const activeId = useAppSelector(selectActiveConversationId);
  const activeConv = useAppSelector(selectActiveConversation);
  const messages = useAppSelector(selectConversationMessages(activeId ?? ''));
  const showMobileChat = Boolean(activeId);

  const handleSend = (content: string) => {
    if (!activeId) return;
    dispatch(sendMessage({ conversationId: activeId, senderId: userId, content }));
  };

  const activeParticipant = activeConv
    ? getParticipantInfo(activeConv.participantIds.find((id) => id !== userId) ?? '')
    : null;

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-text mb-4 sm:mb-6">{TEXT.CUSTOMER.MESSAGES.TITLE}</h1>

      {conversations.length === 0 ? (
        <EmptyState icon={MessageSquare} title={TEXT.CUSTOMER.MESSAGES.EMPTY} />
      ) : (
        <div className="rounded-2xl border border-border bg-white overflow-hidden flex h-[calc(100dvh-11rem)] sm:h-[calc(100vh-12rem)] min-h-[420px]">
          {/* Conversation list */}
          <div
            className={cn(
              'w-full sm:w-80 border-r border-border overflow-y-auto shrink-0',
              showMobileChat && 'hidden sm:block'
            )}
          >
            {conversations.map((conv) => {
              const otherId = conv.participantIds.find((id) => id !== userId) ?? '';
              const participant = getParticipantInfo(otherId);
              const unread = conv.unreadCount[userId] ?? 0;

              return (
                <button
                  key={conv.id}
                  onClick={() => dispatch(setActiveConversation(conv.id))}
                  className={cn(
                    'w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors border-b border-border',
                    activeId === conv.id && 'bg-primary/5'
                  )}
                >
                  <AppImage src={participant.avatar} alt={participant.name} className="h-10 w-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-sm truncate">{participant.name}</p>
                      <span className="text-xs text-text-muted shrink-0">{formatRelativeTime(conv.lastMessageAt)}</span>
                    </div>
                    <p className="text-xs text-text-muted truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                  {unread > 0 && (
                    <span className="h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">
                      {unread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Chat window */}
          <div className={cn('flex-1 flex-col min-w-0', showMobileChat ? 'flex' : 'hidden sm:flex')}>
            {activeConv && activeParticipant ? (
              <>
                <div className="flex items-center gap-3 border-b border-border px-4 py-3 sm:hidden">
                  <button
                    onClick={() => dispatch(setActiveConversation(null))}
                    className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                    aria-label={TEXT.COMMON.BACK}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <AppImage src={activeParticipant.avatar} alt={activeParticipant.name} className="h-9 w-9 rounded-full object-cover" />
                  <p className="font-medium text-sm truncate">{activeParticipant.name}</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <ChatBubble
                      key={msg.id}
                      message={msg}
                      isOwn={msg.senderId === userId}
                      senderName={getParticipantInfo(msg.senderId).name}
                      senderAvatar={getParticipantInfo(msg.senderId).avatar}
                    />
                  ))}
                </div>
                <MessageInput onSend={handleSend} placeholder={TEXT.CUSTOMER.MESSAGES.TYPE_MESSAGE} />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-text-muted text-sm px-4 text-center">
                Select a conversation
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
