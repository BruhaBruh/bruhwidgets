import { easings } from '~/lib/easings';

export type AnimationName = 'slide' | 'scale' | 'fade' | 'none';

export type AnimationTimingFunction = keyof typeof easings;

export type AnimationOptions = Record<string, number | string | undefined>;
