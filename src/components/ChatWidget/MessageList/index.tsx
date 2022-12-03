import { memo } from 'react';
import { MessageAlternativeBlock } from '~/components/ChatWidget/MessageAlternativeBlock';
import { MessageBlock } from '~/components/ChatWidget/MessageBlock';
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
				if (type === 'blocks') return <MessageBlock key={v.state.id} message={v} />;
				if (type === 'alternative-blocks')
					return <MessageAlternativeBlock key={v.state.id} message={v} />;
				return <MessageDefault key={v.state.id} message={v} />;
			})}
		</div>
	);
});

MemoizedMessageList.displayName = 'MessageList';

export const MessageList = MemoizedMessageList;
