import { ActionIcon } from '@mantine/core';
import { openSpotlight } from '@mantine/spotlight';
import { IconCommand } from '@tabler/icons';

export const Fab = () => {
	return (
		<ActionIcon
			size="xl"
			variant="default"
			sx={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 10 }}
			onClick={() => openSpotlight()}
		>
			<IconCommand size={34} />
		</ActionIcon>
	);
};
