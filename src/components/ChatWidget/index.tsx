import React, { CSSProperties } from 'react';
import { MessageList } from '~/components/ChatWidget/MessageList';
import { ChatProvider } from '~/context/ChatContext';
import { TwitchBadge } from '~/types/badge';
import { ChatMessage } from '~/types/chatMessage';
import { ChatSettings } from '~/types/chatSettings';
import { Emotes } from '~/types/emote';
import styles from './index.module.scss';

export type ChatWidgetProps = {
	chatSettings: ChatSettings;
	emotes: Emotes;
	badges: TwitchBadge[];
	messages: ChatMessage[];
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({
	chatSettings,
	emotes,
	badges,
	messages,
}) => {
	return (
		<ChatProvider chatSettings={chatSettings} emotes={emotes} badges={badges}>
			<div
				className={`chat-widget ${styles['chat-widget']} ${
					!chatSettings.isDisabledPadding && styles['chat-widget_padding']
				}`}
				style={
					{
						fontFamily: `${chatSettings.font}, Inter, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu,
		Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
						'--font-size': `${chatSettings.fontSize}px`,
						'--background-color-rgb': '17,24,39',
						'--background-color': 'rgba(var(--background-color-rgb),0.9)',
						'--color-rgb': '249,250,251',
						'--color': 'rgb(var(--color-rgb))',
					} as CSSProperties
				}
			>
				<MessageList messages={messages} />
			</div>
		</ChatProvider>
	);
};
