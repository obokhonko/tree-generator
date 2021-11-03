import React, {useCallback, useEffect, useState} from 'react';
import {getSelectedItemByName, TCatalogItem} from './directory-tree.functions';

interface ITreeNode {
	data: TCatalogItem;
	currentSelection: TCatalogItem | null;
	onClick: (value: TCatalogItem) => void;
	submenuRenderer: any;
}

const TreeNode: React.FC<ITreeNode> = (props): JSX.Element => {
	const {
		data,
		onClick,
		submenuRenderer,
		currentSelection
	} = props;

	const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isChildActive, setIsChildActive] = useState<boolean>(false);

	const hasSubmenu = data.children && data.children.length > 0;

	const getClassName = useCallback((): string => {
		let value = '';

		if (hasSubmenu) {
			value += 'parent';
		}

		if (isActive) {
			value += ' active';
		}

		return value.trim();
	}, [hasSubmenu, isActive]);

	useEffect(() => {
		if (currentSelection) {
			setIsActive(data.id === currentSelection?.id);

			if (hasSubmenu) {
				setIsChildActive(getSelectedItemByName(data.children, currentSelection?.text) !== null);
			}
		}
	}, [currentSelection, data, hasSubmenu]);

	const handleOnClick = useCallback((item: TCatalogItem) => {
		return () => {
			onClick(item);
		};
	}, [onClick]);

	const handleIconClick = useCallback(() => {
		setIsMenuVisible(!isMenuVisible);
	}, [isMenuVisible]);

	const showSubmenu = useCallback(() => {
		if (!hasSubmenu) {
			return false;
		}

		if (isChildActive) {
			return true;
		}

		if (isMenuVisible) {
			return true;
		}

		return false;
	}, [hasSubmenu, isMenuVisible, isChildActive]);

	return (
		<li className={getClassName()}>
			<i onClick={handleIconClick} className={'fa' + (showSubmenu() ? ' fa-arrow-down' : ' fa-arrow-right')} />
			<a href="#" onClick={handleOnClick(data)}>
				{data.text}
			</a>
			{ showSubmenu() && submenuRenderer(data.children) }
		</li>
	);
};

export {TreeNode};

