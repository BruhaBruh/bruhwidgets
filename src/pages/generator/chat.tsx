import { Button, Container, Divider, Group, Stack, TextInput, Title, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { ChatLinkGenerator } from '~/components/ChatLinkGenerator';
import { useTranslation } from '~/context/TranslationContext';
import { fromBase64, toBase64 } from '~/lib/base64';
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
	const hashOfSettings = useMemo(() => toBase64(JSON.stringify(settings)), [settings]);
	const t = useTranslation();

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
			const rawJSON = fromBase64(hash);
			const s = JSON.parse(rawJSON);
			settingsWithFunctions.set(s);
		} catch (e) {
			console.error(e);
		}
	}, [hash, settingsWithFunctions]);

	return (
		<Container my="xl">
			<NextSeo title={t('chat-widget')} />
			<Title>{t('chat-widget')}</Title>
			<Divider my="lg" />
			<Stack spacing="md">
				<TextInput
					label={t('chat-widget.channel')}
					placeholder={t('chat-widget.channel.placeholder')}
					withAsterisk
					value={channel}
					onChange={handleChangeChanel}
				/>
				<ChatLinkGenerator />
				<Group spacing="sm">
					<TextInput
						label={t('chat-widget.link.widget')}
						readOnly
						disabled={!channel}
						value={`${process.env.NEXT_PUBLIC_ORIGIN}/widget/chat/${channel}?settings=${hashOfSettings}`}
						sx={{ flex: 1 }}
					/>
					<Tooltip label={clipboard.copied ? t('copied') : t('copy.tooltip')}>
						<Button
							disabled={!channel}
							onClick={() =>
								clipboard.copy(
									`${process.env.NEXT_PUBLIC_ORIGIN}/widget/chat/${channel}?settings=${hashOfSettings}`
								)
							}
							sx={{ alignSelf: 'flex-end' }}
						>
							{t('copy')}
						</Button>
					</Tooltip>
				</Group>
				<Group spacing="sm">
					<TextInput
						label={t('chat-widget.link.preview')}
						readOnly
						disabled={!channel}
						value={`${process.env.NEXT_PUBLIC_ORIGIN}/preview/chat/${channel}?settings=${hashOfSettings}`}
						sx={{ flex: 1 }}
					/>
					<Tooltip label={clipboard.copied ? t('copied') : t('copy.tooltip')}>
						<Button
							disabled={!channel}
							onClick={() =>
								clipboard.copy(
									`${process.env.NEXT_PUBLIC_ORIGIN}/preview/chat/${channel}?settings=${hashOfSettings}`
								)
							}
							sx={{ alignSelf: 'flex-end' }}
						>
							{t('copy')}
						</Button>
					</Tooltip>
				</Group>
				<Group spacing="sm">
					<TextInput
						label={t('chat-widget.settings-hash')}
						readOnly
						value={hashOfSettings}
						sx={{ flex: 1 }}
					/>
					<Tooltip label={clipboard.copied ? t('copied') : t('copy.tooltip')}>
						<Button onClick={() => clipboard.copy(hashOfSettings)} sx={{ alignSelf: 'flex-end' }}>
							{t('copy')}
						</Button>
					</Tooltip>
				</Group>
				<Group spacing="sm">
					<TextInput
						value={hash}
						onChange={handleChangeHash}
						label={t('chat-widget.load-settings-hash')}
						placeholder={t('chat-widget.load-settings-hash.placeholder')}
						sx={{ flex: 1 }}
					/>
					<Button disabled={!hash} onClick={handleLoadFromHashClick} sx={{ alignSelf: 'flex-end' }}>
						{t('load')}
					</Button>
				</Group>
			</Stack>
		</Container>
	);
};

export default Chat;
