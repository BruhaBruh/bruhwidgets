export const replaceBetween = (str: string, start: number, end: number, content: string) =>
	str.substring(0, start) + content + str.substring(end);
