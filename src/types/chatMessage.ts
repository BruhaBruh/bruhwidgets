import { RefObject } from 'react';
import type { ChatUserstate } from 'tmi.js';

export type ChatMessage = {
	state: ChatUserstate;
	text: string;
	nodeRef: RefObject<HTMLDivElement>;
};
