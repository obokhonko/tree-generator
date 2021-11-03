import React, {useCallback} from 'react';
import {TCatalogItem} from './directory-tree.functions';
import {TreeNode} from './tree-node';
import {uniqueId} from '../../app.utils';

import './styles/index.less';

interface IDirectoryTree {
	source: any;
	current: TCatalogItem | null;
	onSelect(value: TCatalogItem): void;
}

const DirectoryTree: React.FC<IDirectoryTree> = ({source, onSelect, current}): JSX.Element => {
	const treeRenderer = useCallback((data: TCatalogItem[] | undefined): JSX.Element => {
		return (
			<ul key={uniqueId('tree-menu')}>
				{
					data && data.map(item => <TreeNode key={item.id}
					                                   data={item}
					                                   currentSelection={current}
					                                   onClick={onSelect}
					                                   submenuRenderer={treeRenderer} />)
				}
			</ul>
		);
	}, [current, onSelect]);

	if (!source) {
		return <h3>Loading...</h3>;
	}

	return <div className="tree">{ treeRenderer(source) }</div>;
};

export {DirectoryTree};
