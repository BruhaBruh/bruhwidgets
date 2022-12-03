export const getBanWordRegExp = (banWords: string[]) =>
	new RegExp(
		`(${banWords
			.map((word) => {
				return word.split('').join('([_\\-\\/\\ |+=.,!]?)+');
			})
			.join('|')})`,
		'gi'
	);
