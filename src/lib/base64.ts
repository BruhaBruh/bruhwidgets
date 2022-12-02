export const toBase64 = (v: string, charset: BufferEncoding = 'utf-8') =>
	Buffer.from(v, charset).toString('base64').replaceAll('=', '');
export const fromBase64 = (v: string, charset: BufferEncoding = 'utf-8') =>
	Buffer.from(v, 'base64').toString(charset);
