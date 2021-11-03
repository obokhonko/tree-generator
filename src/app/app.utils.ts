const idCounter = {};

export function uniqueId(prefix = '$global$'): string {
	if (!idCounter[prefix]) {
		idCounter[prefix] = 0;
	}

	const id = ++idCounter[prefix];

	if (prefix === '$global$') {
		return `${id}`;
	}

	return `${prefix}${id}`;
}
