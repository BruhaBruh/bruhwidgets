import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

const Document: React.FC<DocumentProps> = () => {
	return (
		<Html lang="ru">
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
