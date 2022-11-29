import { Button, Container, Divider, Group, Stack, TextInput, Title, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { NextPage } from 'next';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { ChatLinkGenerator } from '~/components/ChatLinkGenerator';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { ChatSettings } from '~/types/chatSettings';

const Chat: NextPage = () => {
	const [channel, setChannel] = useState('');
	const [hash, setHash] = useState('');
	const clipboard = useClipboard({ timeout: 500 });
	const settingsWithFunctions = useChatGenerator();
	const settings = useMemo(() => {
		const s = { ...settingsWithFunctions };
		Object.entries(s).forEach(([key, value]) => {
			if (typeof value !== 'function') return;
			// eslint-why s contains key because we are in entry
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			delete (s as any)[key];
		});
		return s as ChatSettings;
	}, [settingsWithFunctions]);
	const hashOfSettings = useMemo(
		() => Buffer.from(JSON.stringify(settings), 'utf-8').toString('base64'),
		[settings]
	);

	const handleChangeChanel = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setChannel(e.currentTarget.value);
		},
		[setChannel]
	);
	const handleChangeHash = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setHash(e.currentTarget.value);
		},
		[setHash]
	);
	const handleLoadFromHashClick = useCallback(() => {
		try {
			const rawJSON = Buffer.from(hash, 'base64').toString('utf-8');
			const s = JSON.parse(rawJSON);
			settingsWithFunctions.set(s);
		} catch (e) {
			console.error(e);
		}
	}, [hash, settingsWithFunctions]);

	return (
		<Container my="xl">
			<Title>Chat widget</Title>
			<Divider my="lg" />
			<Stack spacing="md">
				<TextInput
					label="Channel"
					placeholder="Your channel name"
					withAsterisk
					value={channel}
					onChange={handleChangeChanel}
				/>
				<ChatLinkGenerator />
				<Group spacing="sm">
					<TextInput
						label="Link to chat widget"
						readOnly
						value={`http://localhost:3000/widget/chat/${channel}?settings=${hashOfSettings}`}
						sx={{ flex: 1 }}
					/>
					<Tooltip label={clipboard.copied ? 'Copied' : 'Click to copy'}>
						<Button
							onClick={() =>
								clipboard.copy(
									`http://localhost:3000/widget/chat/${channel}?settings=${hashOfSettings}`
								)
							}
							sx={{ alignSelf: 'flex-end' }}
						>
							Copy
						</Button>
					</Tooltip>
				</Group>
				<Group spacing="sm">
					<TextInput
						label="Link to preiew chat widget"
						readOnly
						value={`http://localhost:3000/preview/chat/${channel}?settings=${hashOfSettings}`}
						sx={{ flex: 1 }}
					/>
					<Tooltip label={clipboard.copied ? 'Copied' : 'Click to copy'}>
						<Button
							onClick={() =>
								clipboard.copy(
									`http://localhost:3000/preview/chat/${channel}?settings=${hashOfSettings}`
								)
							}
							sx={{ alignSelf: 'flex-end' }}
						>
							Copy
						</Button>
					</Tooltip>
				</Group>
				<Group spacing="sm">
					<TextInput label="Chat settings hash" readOnly value={hashOfSettings} sx={{ flex: 1 }} />
					<Tooltip label={clipboard.copied ? 'Copied' : 'Click to copy'}>
						<Button onClick={() => clipboard.copy(hashOfSettings)} sx={{ alignSelf: 'flex-end' }}>
							Copy
						</Button>
					</Tooltip>
				</Group>
				<Group spacing="sm">
					<TextInput
						value={hash}
						onChange={handleChangeHash}
						label="Chat Settings from hash"
						placeholder="Enter settings hash"
						sx={{ flex: 1 }}
					/>
					<Button onClick={handleLoadFromHashClick} sx={{ alignSelf: 'flex-end' }}>
						Load
					</Button>
				</Group>
			</Stack>
		</Container>
	);
};

export default Chat;
