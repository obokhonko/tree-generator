import React, {useCallback, useEffect, useState} from 'react';
import {Breadcrumbs} from './components/breadcrumbs/breadcrumbs';
import {DirectoryTree} from './components/directory-tree/directory-tree';
import {fetchDirectoryTree, TCatalogItem, getSelectedItemByName} from './components/directory-tree/directory-tree.functions';

export const AppComponent: React.FC = (): JSX.Element => {
	const [data, setData] = useState<TCatalogItem[] | null>(null);
	const [current, setCurrent] = useState<TCatalogItem | null>(null);

	const getData = async (): Promise<void> => {
		setData(await fetchDirectoryTree());
	};

	useEffect(() => {
		void getData();
	}, []);

	useEffect(() => {
		if (data) {
			setCurrent(data[0]);
		}
	}, [data]);

	const handlerOnTreeSelect = useCallback((value): void => {
		setCurrent(value);
	}, []);

	const handlerOnBreadcrumbClick = useCallback((value: string): void => {
		if (data) {
			const item = getSelectedItemByName(data, value);

			setCurrent(item);
		}
	}, [data]);

	return (
		<>
			<Breadcrumbs source={data} current={current} onClick={handlerOnBreadcrumbClick}/>
			<DirectoryTree source={data} current={current} onSelect={handlerOnTreeSelect}/>
		</>
	);
};
