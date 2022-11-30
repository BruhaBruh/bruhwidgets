import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

const HiddenNickname: React.FC<{ nickname: string }> = ({ nickname }) => {
	const removeHiddenNickname = useChatGenerator((state) => state.removeHiddenNickname);
	const t = useTranslation();

	const handleRemoveClick = useCallback(() => {
		removeHiddenNickname(nickname);
	}, [removeHiddenNickname, nickname]);

	return (
		<Group spacing="sm">
			<Text fz="xl" sx={{ flex: 1 }}>
				{nickname}
			</Text>
			<Button sx={{ alignSelf: 'flex-end' }} color="red" onClick={handleRemoveClick}>
				{t('remove')}
			</Button>
		</Group>
	);
};

const HiddenNicknames = () => {
	const hiddenNicknames = useChatGenerator((state) => state.hiddenNicknames);

	return (
		<>
			{hiddenNicknames.map((nick) => (
				<HiddenNickname key={nick} nickname={nick} />
			))}
		</>
	);
};

export const HiddenNicknamesControl = () => {
	const [nickname, setNickname] = useState('');
	const addHiddenNickname = useChatGenerator((state) => state.addHiddenNickname);
	const t = useTranslation();

	const handleChangeNickname = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setNickname(e.currentTarget.value);
		},
		[setNickname]
	);

	const handleAddClick = useCallback(() => {
		if (!nickname) return;
		addHiddenNickname(nickname);
		setNickname('');
	}, [addHiddenNickname, nickname, setNickname]);

	return (
		<Stack spacing="sm">
			<Group spacing="sm">
				<TextInput
					value={nickname}
					onChange={handleChangeNickname}
					withAsterisk
					label={t('chat-widget.hidden-nicknames')}
					placeholder={t('chat-widget.hidden-nicknames.placeholder')}
					sx={{ flex: 1 }}
				/>
				<Button sx={{ alignSelf: 'flex-end' }} onClick={handleAddClick}>
					{t('add')}
				</Button>
			</Group>
			<HiddenNicknames />
		</Stack>
	);
};
