/* eslint-disable @typescript-eslint/no-unsafe-function-type */
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => unknown
	? A
	: never;

export function debounce<TCallback extends Function>(
	callback: TCallback,
	delay = 300
) {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (...args: ArgumentTypes<TCallback>) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => callback(...args), delay);
	};
}