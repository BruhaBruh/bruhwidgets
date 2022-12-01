import {
	ActionIcon,
	Box,
	Button,
	ColorPicker,
	Group,
	Stack,
	Switch,
	Text,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy } from '@tabler/icons';
import chroma from 'chroma-js';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { ChatCustomNicknameColor } from '~/types/chatSettings';

const NicknamePreview: React.FC<{ nickname: string; color: ChatCustomNicknameColor }> = ({
	nickname,
	color,
}) => {
	const t = useTranslation();
	const gradient = chroma
		.scale([color.startColor, color.endColor ?? color.startColor])
		.mode('hcl')
		.colors(color.endColor ? 8 : 2, 'hex');

	return (
		<Text>
			{t('preview')}:{' '}
			<Box
				component="span"
				sx={{
					background: `linear-gradient(to right,${gradient.join(',')})`,
					backgroundClip: 'text',
					'-webkit-text-fill-color': 'transparent',
				}}
			>
				{nickname}
			</Box>
		</Text>
	);
};

const CustomNickname: React.FC<{ nickname: string; color: ChatCustomNicknameColor }> = ({
	nickname,
	color,
}) => {
	const t = useTranslation();
	const gradient = chroma
		.scale([color.startColor, color.endColor ?? color.startColor])
		.mode('hcl')
		.colors(color.endColor ? 8 : 2, 'hex');
	const removeCustomNickname = useChatGenerator((state) => state.removeCustomNickname);

	const handleRemoveClick = useCallback(() => {
		removeCustomNickname(nickname);
	}, [removeCustomNickname, nickname]);

	return (
		<Group spacing="sm">
			<Text fz="xl" sx={{ flex: 1 }}>
				<Box
					component="span"
					sx={{
						background: `linear-gradient(to right,${gradient.join(',')})`,
						backgroundClip: 'text',
						'-webkit-text-fill-color': 'transparent',
					}}
				>
					{nickname}
				</Box>
				<span>
					{' '}
					<span style={{ color: color.startColor }}>{color.startColor}</span>
					{color.endColor && ' - '}
					{color.endColor && <span style={{ color: color.endColor }}>{color.endColor}</span>}
				</span>
			</Text>
			<Button onClick={handleRemoveClick} sx={{ alignSelf: 'flex-end' }} color="red">
				{t('remove')}
			</Button>
		</Group>
	);
};

const CustomNicknames = () => {
	const customNicknames = useChatGenerator((state) => state.customNicknames);

	return (
		<>
			{Object.entries(customNicknames).map(([nickname, color]) => (
				<CustomNickname key={nickname} nickname={nickname} color={color} />
			))}
		</>
	);
};

export const CustomNicknamesControl = () => {
	const [nickname, setNickname] = useState('');
	const [isGradient, setIsGradient] = useState(false);
	const [startColor, setStartColor] = useState('#ffffff');
	const [endColor, setEndColor] = useState('#ffffff');
	const addCustomNickname = useChatGenerator((state) => state.addCustomNickname);
	const clipboard = useClipboard();
	const t = useTranslation();

	const handleChangeNickname = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setNickname(e.currentTarget.value);
		},
		[setNickname]
	);
	const handleChangeIsGradient = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setIsGradient(e.currentTarget.checked);
		},
		[setIsGradient]
	);
	const handleChangeStartColor = useCallback(
		(c: string) => {
			setStartColor(c);
		},
		[setStartColor]
	);
	const handleChangeInputStartColor = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setStartColor(e.currentTarget.value);
		},
		[setStartColor]
	);
	const handleChangeEndColor = useCallback(
		(c: string) => {
			setEndColor(c);
		},
		[setEndColor]
	);
	const handleChangeInputEndColor = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setEndColor(e.currentTarget.value);
		},
		[setEndColor]
	);
	const handleAddClick = useCallback(() => {
		if (!nickname) return;
		addCustomNickname(nickname, { startColor, endColor: isGradient ? endColor : undefined });
	}, [addCustomNickname, nickname, startColor, isGradient, endColor]);

	return (
		<Stack spacing="sm">
			<Group spacing="sm">
				<TextInput
					value={nickname}
					onChange={handleChangeNickname}
					withAsterisk
					label={t('chat-widget.custom-nicknames')}
					placeholder={t('chat-widget.custom-nicknames.placeholder')}
					sx={{ flex: 1 }}
				/>
				<Button onClick={handleAddClick} sx={{ alignSelf: 'flex-end' }}>
					{t('add')}
				</Button>
			</Group>
			<Switch
				checked={isGradient}
				onChange={handleChangeIsGradient}
				label={t('chat-widget.custom-nicknames.is-gradient')}
			/>
			<Group spacing="sm" grow>
				<Stack spacing="sm">
					<Text fz="sm">{t('start-color')}</Text>
					<ColorPicker
						fullWidth
						value={startColor}
						onChange={handleChangeStartColor}
						size="xl"
						format="hex"
					/>
					<TextInput
						icon={
							<Box
								sx={{
									width: 14,
									height: 14,
									backgroundColor: startColor,
									borderRadius: 4,
								}}
							/>
						}
						rightSection={
							<Tooltip label={clipboard.copied ? t('copied') : t('copy.tooltip')}>
								<ActionIcon onClick={() => clipboard.copy(startColor)}>
									<IconCopy size={18} />
								</ActionIcon>
							</Tooltip>
						}
						value={startColor}
						onChange={handleChangeInputStartColor}
						placeholder={t('hex-color')}
					/>
				</Stack>
				{isGradient && (
					<Stack spacing="sm">
						<Text fz="sm">{t('end-color')}</Text>
						<ColorPicker
							fullWidth
							value={endColor}
							onChange={handleChangeEndColor}
							size="xl"
							format="hex"
						/>
						<TextInput
							icon={
								<Box
									sx={{
										width: 14,
										height: 14,
										backgroundColor: endColor,
										borderRadius: 4,
									}}
								/>
							}
							rightSection={
								<Tooltip label={clipboard.copied ? t('copied') : t('copy.tooltip')}>
									<ActionIcon onClick={() => clipboard.copy(endColor)}>
										<IconCopy size={18} />
									</ActionIcon>
								</Tooltip>
							}
							value={endColor}
							onChange={handleChangeInputEndColor}
							placeholder={t('hex-color')}
						/>
					</Stack>
				)}
			</Group>
			<NicknamePreview
				nickname={nickname}
				color={{ startColor, endColor: isGradient ? endColor : undefined }}
			/>
			<CustomNicknames />
		</Stack>
	);
};
