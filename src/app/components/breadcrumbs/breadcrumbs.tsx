import React, {useCallback, useEffect, useState} from 'react';
import {uniqueId} from '../../app.utils';
import {generateBreadcrumbs} from './breadcrumb.functions';

import './styles/index.less';

interface IBreadcrumbs {
	source: any;
	current: any;
	onClick(value: string): void;
}

const Breadcrumbs: React.FC<IBreadcrumbs> = ({source, current, onClick}): JSX.Element => {
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		if (source) {
			const result = generateBreadcrumbs(source);
			setData(result);
		}
	}, [source]);

	const handleOnClick = useCallback((id: string) => {
		return () => {
			onClick(id);
		};
	}, [onClick]);

	if (!current) {
		return <h3>Loading...</h3>;
	}

	return (
		<ul className="breadcrumbs">
			{
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				data[current.id].map(item => <li key={uniqueId(item)}><a href="#" onClick={handleOnClick(item)}>{item}</a></li>)
			}
		</ul>
	);
};

export {Breadcrumbs};
