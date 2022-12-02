import chroma from 'chroma-js';

export const getGradientColorsArray = (startColor: string, endColor?: string) => {
	return chroma
		.scale([startColor, endColor ?? startColor])
		.mode('hcl')
		.colors(endColor ? 8 : 2, 'hex');
};
