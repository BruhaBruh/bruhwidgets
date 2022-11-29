import { Box, Button, ColorPicker, Group, Stack, Switch, Text, TextInput } from '@mantine/core';
import chroma from 'chroma-js';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { ChatCustomNicknameColor } from '~/types/chatSettings';

const NicknamePreview: React.FC<{ nickname: string; color: ChatCustomNicknameColor }> = ({
	nickname,
	color,
}) => {
	const gradient = chroma
		.scale([color.startColor, color.endColor ?? color.startColor])
		.mode('hcl')
		.colors(color.endColor ? 8 : 2, 'hex');

	return (
		<Text>
			Preview:{' '}
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
				Remove
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
	const handleChangeEndColor = useCallback(
		(c: string) => {
			setEndColor(c);
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
					label="Custom nicknames"
					placeholder="Nickname"
					sx={{ flex: 1 }}
				/>
				<Button onClick={handleAddClick} sx={{ alignSelf: 'flex-end' }}>
					Add
				</Button>
			</Group>
			<Switch checked={isGradient} onChange={handleChangeIsGradient} label="Is gradient?" />
			<Group spacing="sm" grow>
				<ColorPicker value={startColor} onChange={handleChangeStartColor} size="xl" format="hex" />
				{isGradient && (
					<ColorPicker value={endColor} onChange={handleChangeEndColor} size="xl" format="hex" />
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
