import React from 'react';
import { Badges } from '~/components/ChatWidget/Badges';
import { MessageProps } from '~/components/ChatWidget/MessageDefault';
import { Text } from '~/components/ChatWidget/Text';
import { Username } from '~/components/ChatWidget/Username';
import styles from './index.module.scss';

export const MessageBlock: React.FC<MessageProps> = ({ message }) => {
	return (
		<div className={`chat-message ${styles['chat-message']}`}>
			<div className={`chat-message__layout ${styles['chat-message__layout']}`}>
				<div className={`chat-message__mds ${styles['chat-message__mds']}`}>
					<span
						className={`chat-message__username-with-badges ${styles['chat-message__username-with-badges']}`}
					>
						<Badges badges={message.state.badges ?? {}} />
						<Username
							color={message.state.color ?? null}
							nickname={message.state['display-name'] ?? message.state.username ?? '<nickname>'}
						/>
						<span>:&nbsp;</span>
					</span>
					<Text message={message.text} />
				</div>
			</div>
		</div>
	);
};
