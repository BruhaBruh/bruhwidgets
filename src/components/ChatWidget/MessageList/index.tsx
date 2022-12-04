import { CSSProperties, memo } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { MessageAlternativeBlock } from '~/components/ChatWidget/MessageAlternativeBlock';
import { MessageBlock } from '~/components/ChatWidget/MessageBlock';
import { MessageDefault } from '~/components/ChatWidget/MessageDefault';
import { useChat } from '~/context/ChatContext';
import { getAnimationDuration } from '~/lib/getAnimationDuration';
import { getAnimationStyle } from '~/lib/getAnimationStyle';
import { ChatMessage } from '~/types/chatMessage';
import styles from './index.module.scss';

export type MessageListProps = {
	messages: ChatMessage[];
};

const MemoizedMessageList = memo(({ messages }: MessageListProps) => {
	const type = useChat((c) => c.settings.type);
	const animation = useChat((c) => c.settings.animation);

	if (messages.length === 0) return <></>;

	return (
		<TransitionGroup
			className={`message-list ${styles['message-list']} ${styles[`message-list_type-${type}`]}`}
		>
			{messages.reverse().map((v: ChatMessage) => {
				const msg = (style: CSSProperties) => {
					if (type === 'blocks') return <MessageBlock ref={v.nodeRef} message={v} style={style} />;
					if (type === 'alternative-blocks')
						return <MessageAlternativeBlock ref={v.nodeRef} message={v} style={style} />;
					return <MessageDefault ref={v.nodeRef} message={v} style={style} />;
				};

				return (
					<Transition
						mountOnEnter
						unmountOnExit
						key={v.state.id}
						nodeRef={v.nodeRef}
						timeout={getAnimationDuration(animation.options)}
					>
						{(status) =>
							msg(
								getAnimationStyle(
									status,
									animation.name,
									animation.timingFunction,
									animation.options
								)
							)
						}
					</Transition>
				);
			})}
		</TransitionGroup>
	);
});

MemoizedMessageList.displayName = 'MessageList';

export const MessageList = MemoizedMessageList;
