import { createContext, useContext, useMemo } from 'react';
import { initialState } from '~/stores/useChatGenerator';
import { TwitchBadge } from '~/types/badge';
import { ChatSettings } from '~/types/chatSettings';
import { Emotes } from '~/types/emote';

export type ChatConfig = {
	settings: ChatSettings;
	emotes: Emotes;
	badges: TwitchBadge[];
};

export const ChatContext = createContext<ChatConfig>({
	settings: initialState,
	emotes: {
		bttv: {
			template: 'https://cdn.betterttv.net/emote/{id}/3x',
			emotes: [],
		},
		ffz: [],
		stv: [],
	},
	badges: [],
});

export const ChatProvider = ({
	chatSettings,
	emotes,
	badges,
	children,
}: {
	chatSettings: ChatSettings;
	emotes: Emotes;
	badges: TwitchBadge[];
	children: React.ReactNode;
}) => {
	return (
		<ChatContext.Provider value={{ settings: chatSettings, emotes, badges }}>
			{children}
		</ChatContext.Provider>
	);
};

export function useChat<T = ChatConfig>(selector?: (config: ChatConfig) => T): T {
	const ctx = useContext(ChatContext);
	const value = useMemo<unknown>(() => selector?.(ctx) ?? ctx, [ctx, selector]);

	return value as T;
}
