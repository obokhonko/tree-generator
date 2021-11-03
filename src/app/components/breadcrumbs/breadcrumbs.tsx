import React, {useCallback, useEffect, useState} from 'react';
import {uniqueId} from '../../app.utils';
import {TBreadcrumbs, generateBreadcrumbs} from './breadcrumb.functions';
import type {TCatalogItem} from '../directory-tree/directory-tree.functions';

import './styles/index.less';

interface IBreadcrumbsProps {
   source: TCatalogItem[] | null;
   current: TCatalogItem | null;

   onClick(value: string): void;
}

const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({source, current, onClick}): JSX.Element => {
   const [data, setData] = useState<TBreadcrumbs | null>(null);

   useEffect(() => {
	  if (source) {
		 setData(generateBreadcrumbs(source));
	  }
   }, [source]);

   const handleOnClick = useCallback((id: string) => {
	  return () => {
		 onClick(id);
	  };
   }, [onClick]);

   if (!current || !data) {
	  return <h3>Loading...</h3>;
   }

   return (
	  <ul className="breadcrumbs">
		 {
			data[current.id].map(item => <li key={uniqueId(item)}><a href="#" onClick={handleOnClick(item)}>{item}</a></li>)
		 }
	  </ul>
   );
};

export {IBreadcrumbsProps, Breadcrumbs};
