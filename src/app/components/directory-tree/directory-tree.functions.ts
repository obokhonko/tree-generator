type TResponseItem = {
   id: string;
   parent: string | null;
   text: string;
};

type TCatalogItem = TResponseItem & {
   children: TCatalogItem[];
};

async function fetchDirectoryTree(): Promise<TCatalogItem[] | null> {
   try {
	  const response = await fetch('https://run.mocky.io/v3/818a9b69-d2f1-4948-948f-c6856a2da974');
	  return generateTree(await response.json(), null);
   } catch (e) {
	  return null;
   }
}

function generateTree(catalog: TResponseItem[], parent): TCatalogItem[] {
   const nodeList: TCatalogItem[] = [];

   catalog
	  .filter(item => item.parent === parent)
	  .forEach(item => {
		 const node = {
			...item,
			children: generateTree(catalog, item.id)
		 };

		 nodeList.push(node);
	  });

   return nodeList;
}

function getSelectedItemByName(source: TCatalogItem[], name: string): any {
   let selectedItem: TCatalogItem | null = null;

   if (source) {
	  source.forEach(item => {
		 if (selectedItem) {
			return;
		 }

		 if (item.text === name) {
			selectedItem = item;
		 }

		 if (item?.children && item.children.length > 0 && !selectedItem) {
			selectedItem = getSelectedItemByName(item.children, name);
		 }
	  });
   }

   return selectedItem;
}

export {TCatalogItem, fetchDirectoryTree, getSelectedItemByName};

