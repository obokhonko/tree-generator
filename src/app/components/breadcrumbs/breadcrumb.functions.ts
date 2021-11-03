// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function generateBreadcrumbs(config) {
	const breadcrumbs = {};

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const scanTree = (collection, path, accumulator) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		collection.forEach(item => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			if (item.children.length > 0) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				scanTree(item.children, [...path, item.text], accumulator);
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			accumulator[item.id] = [...path, item.text];
		});
	};

	scanTree(config, [], breadcrumbs);

	return breadcrumbs;
}
