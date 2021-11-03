import React from 'react';
import {TCatalogItem} from './directory-tree.functions';
import {TreeNode} from './tree-node';
import {uniqueId} from '../../app.utils';

import './styles/index.less';

interface IDirectoryTreeProps {
   source: TCatalogItem[] | null;
   current: TCatalogItem | null;
   onSelect(value: TCatalogItem): void;
}

const DirectoryTree: React.FC<IDirectoryTreeProps> = ({source, onSelect, current}): JSX.Element => {
   if (!source) {
	  return <h3>Loading...</h3>;
   }

   return (
	  <div className="tree">
		 <ul key={uniqueId('tree-menu')}>
			{
			   source.map(item => <TreeNode key={item.id}
			                                data={item}
			                                currentSelection={current}
			                                onClick={onSelect} />)
			}
		 </ul>
	  </div>
   );
};

export {DirectoryTree};
