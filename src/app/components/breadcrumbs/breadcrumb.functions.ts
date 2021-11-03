import type {TCatalogItem} from '../directory-tree/directory-tree.functions';

type TBreadcrumbs = {
   [key: string]: string[];
};

function generateBreadcrumbs(config: TCatalogItem[]): TBreadcrumbs {
	const breadcrumbs: TBreadcrumbs = {};

	const scanTree = (collection: TCatalogItem[], path, accumulator): void => {
		collection.forEach(item => {
			if (item.children.length > 0) {
				scanTree(item.children, [...path, item.text], accumulator);
			}

			(accumulator as TBreadcrumbs)[item.id] = [...path, item.text];
		});
	};

	scanTree(config, [], breadcrumbs);

	return breadcrumbs;
}

export {TBreadcrumbs, generateBreadcrumbs};
