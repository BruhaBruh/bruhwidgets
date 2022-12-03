import { ActionIcon, MultiSelect, Stack } from '@mantine/core';
import { IconEye, IconEyeOff } from '@tabler/icons';
import { useCallback, useState } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const BanWordsInput = () => {
	const bannedWords = useChatGenerator((state) => state.bannedWords);
	const addBanWord = useChatGenerator((state) => state.addBanWord);
	const removeBanWord = useChatGenerator((state) => state.removeBanWord);
	const t = useTranslation();
	const [isShow, setIsShow] = useState(false);

	const handleCreate = useCallback(
		(query: string) => {
			if (!query.trim()) return;
			addBanWord(query);
			return undefined;
		},
		[addBanWord]
	);
	const handleRemove = useCallback(
		(current: string[]) => {
			const removedWords = bannedWords.filter((v) => !current.includes(v));
			removedWords.forEach((word) => removeBanWord(word));
		},
		[bannedWords, removeBanWord]
	);
	const handleIsShowClick = useCallback(() => setIsShow((p) => !p), [setIsShow]);

	return (
		<Stack spacing="sm">
			<MultiSelect
				label={t('chat-widget.ban-words')}
				placeholder={t('chat-widget.ban-words.placeholder')}
				value={isShow ? bannedWords : ['$$_']}
				data={
					isShow
						? bannedWords.map((b) => ({ value: b, label: b }))
						: [{ value: '$$_', label: t('chat-widget.ban-words.hidden') }]
				}
				searchable
				creatable
				getCreateLabel={(query) => `${t('add')} ${query}`}
				onCreate={handleCreate}
				onChange={handleRemove}
				rightSection={
					<ActionIcon color="red" onClick={handleIsShowClick}>
						{isShow ? <IconEyeOff size={18} /> : <IconEye size={18} />}
					</ActionIcon>
				}
			/>
		</Stack>
	);
};
