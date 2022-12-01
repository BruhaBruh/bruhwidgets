import { Center, Container, Divider, Grid, Paper, Text, Title } from '@mantine/core';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useTranslation } from '~/context/TranslationContext';

const IndexPage: NextPage = () => {
	const t = useTranslation();

	return (
		<Container my="xl">
			<NextSeo title="BruhWidgets" />
			<Title>BruhWidgets</Title>
			<Divider my="lg" />
			<Title fz="xl" mb="md">
				{t('index.widgets')}
			</Title>
			<Grid gutter="md" grow>
				<Grid.Col span={3}>
					<Paper
						component={Link}
						href="/generator/chat"
						radius="md"
						p="md"
						py="xl"
						withBorder
						sx={(theme) => ({ '&:hover': { boxShadow: theme.shadows.sm } })}
					>
						<Center>
							<Title fz="md">{t('chat-widget')}</Title>
						</Center>
					</Paper>
				</Grid.Col>
			</Grid>
			<Divider my="lg" />
			<Title fz="xl" mb="md">
				{t('index.about')}
			</Title>
			<Title fz="md">{t('index.about.idea')}</Title>
			<Text mb="sm">{t('index.about.idea.text')}</Text>
			<Title fz="md" mb="xs">
				{t('index.about.links')}
			</Title>
			<Grid gutter="md" grow>
				<Grid.Col span={3}>
					<Paper
						component="a"
						href="https://github.com/BruhaBruh/bruhwidgets"
						radius="md"
						p="md"
						py="xl"
						withBorder
						sx={(theme) => ({ '&:hover': { boxShadow: theme.shadows.sm } })}
					>
						<Center>
							<Title fz="md">{t('index.about.links.github')}</Title>
						</Center>
					</Paper>
				</Grid.Col>
				<Grid.Col span={3}>
					<Paper
						component="a"
						href="https://t.me/BruhaBruh4"
						radius="md"
						p="md"
						py="xl"
						withBorder
						sx={(theme) => ({ '&:hover': { boxShadow: theme.shadows.sm } })}
					>
						<Center>
							<Title fz="md">{t('index.about.links.telegram')}</Title>
						</Center>
					</Paper>
				</Grid.Col>
				<Grid.Col span={3}>
					<Paper
						component="a"
						href="https://twitch.tv/BruhaBruh"
						radius="md"
						p="md"
						py="xl"
						withBorder
						sx={(theme) => ({ '&:hover': { boxShadow: theme.shadows.sm } })}
					>
						<Center>
							<Title fz="md">{t('index.about.links.twitch')}</Title>
						</Center>
					</Paper>
				</Grid.Col>
				<Grid.Col span={3}>
					<Paper
						component="a"
						href="https://donationalerts.ru/r/bruhabruh"
						radius="md"
						p="md"
						py="xl"
						withBorder
						sx={(theme) => ({ '&:hover': { boxShadow: theme.shadows.sm } })}
					>
						<Center>
							<Title fz="md">{t('index.about.links.donation-alerts')}</Title>
						</Center>
					</Paper>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default IndexPage;
