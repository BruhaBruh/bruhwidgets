import {
	ActionIcon,
	AspectRatio,
	Button,
	Container,
	Divider,
	Group,
	Stack,
	TextInput,
	Title,
	Tooltip,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { openModal } from '@mantine/modals';
import { IconScanEye } from '@tabler/icons';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { ChatLinkGenerator } from '~/components/ChatLinkGenerator';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

const getUrl = (channel: string, hash: string, path: string) => {
	const url = new URL((process.env.NEXT_PUBLIC_ORIGIN ?? 'http://localhost:3000') + path + channel);

	url.searchParams.set('settings', hash);

	return url.toString();
};

const getWidgetUrl = (channel: string, hash: string) => {
	return getUrl(channel, hash, '/widget/chat/');
};

const getPreviewUrl = (channel: string, hash: string) => {
	return getUrl(channel, hash, '/preview/chat/');
};

const Chat: NextPage = () => {
	const [channel, setChannel] = useState('');
	const [hash, setHash] = useState('');
	const clipboard = useClipboard({ timeout: 500 });
	const settings = useChatGenerator();
	const loadFromBase64 = useChatGenerator((s) => s.loadFromBase64);
	const hashOfSettings = useMemo(() => encodeURIComponent(settings.base64()), [settings]);
	const t = useTranslation();

	const handleChangeChannel = useCallback(
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
			const raw = decodeURIComponent(hash);
			loadFromBase64(raw);
		} catch {
			try {
				loadFromBase64(hash);
			} catch (e) {
				console.error(e);
			}
		}
	}, [hash, loadFromBase64]);

	const handleOpenPreview = useCallback(() => {
		openModal({
			title: t('preview'),
			children: (
				<AspectRatio ratio={3 / 4}>
					<iframe
						title="chat-widget-preview"
						src={getPreviewUrl(channel, hashOfSettings)}
						style={{ border: 'none' }}
					/>
				</AspectRatio>
			),
		});
	}, [channel, hashOfSettings, t]);

	return (
		<Container my="xl">
			<NextSeo title={t('chat-widget')} />

			<ActionIcon
				disabled={!channel}
				size="lg"
				color="blue"
				variant="subtle"
				sx={{
					position: 'fixed',
					bottom: 'calc(1rem + 2.75rem + 0.5rem)',
					right: '1rem',
					zIndex: 10,
				}}
				onClick={handleOpenPreview}
			>
				<IconScanEye size={26} />
			</ActionIcon>

			<Title>{t('chat-widget')}</Title>
			<Divider my="lg" />
			<Stack spacing="md">
				<TextInput
					label={t('chat-widget.channel')}
					placeholder={t('chat-widget.channel.placeholder')}
					withAsterisk
					value={channel}
					onChange={handleChangeChannel}
				/>
				<ChatLinkGenerator />
				<Group spacing="sm">
					<TextInput
						label={t('chat-widget.link.widget')}
						readOnly
						disabled={!channel}
						value={getWidgetUrl(channel, hashOfSettings)}
						sx={{ flex: 1 }}
					/>
					<Tooltip label={clipboard.copied ? t('copied') : t('copy.tooltip')}>
						<Button
							disabled={!channel}
							onClick={() => clipboard.copy(getWidgetUrl(channel, hashOfSettings))}
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
						value={getPreviewUrl(channel, hashOfSettings)}
						sx={{ flex: 1 }}
					/>
					<Tooltip label={clipboard.copied ? t('copied') : t('copy.tooltip')}>
						<Button
							disabled={!channel}
							onClick={() => clipboard.copy(getPreviewUrl(channel, hashOfSettings))}
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
