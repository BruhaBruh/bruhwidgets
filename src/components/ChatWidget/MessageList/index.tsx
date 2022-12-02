import { memo } from 'react';
import { MessageDefault } from '~/components/ChatWidget/MessageDefault';
import { useChat } from '~/context/ChatContext';
import { ChatMessage } from '~/types/chatMessage';
import styles from './index.module.scss';

export type MessageListProps = {
	messages: ChatMessage[];
};

const MemoizedMessageList = memo(({ messages }: MessageListProps) => {
	const type = useChat((c) => c.settings.type);

	if (messages.length === 0) return <></>;

	return (
		<div
			className={`message-list ${styles['message-list']} ${styles[`message-list_type-${type}`]}`}
		>
			{messages.reverse().map((v) => {
				if (type === 'default') {
					return <MessageDefault key={v.state.id} message={v} />;
				}
				return <>{JSON.stringify(messages, null, 2)}</>;
			})}
		</div>
	);
});

MemoizedMessageList.displayName = 'MessageList';

export const MessageList = MemoizedMessageList;
