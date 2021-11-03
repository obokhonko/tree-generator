import React, {useCallback, useEffect, useState} from 'react';
import {getSelectedItemByName, TCatalogItem} from './directory-tree.functions';
import {uniqueId} from '../../app.utils';

interface ITreeNodeProps {
   data: TCatalogItem;
   currentSelection: TCatalogItem | null;
   onClick: (value: TCatalogItem) => void;
}

const TreeNode: React.FC<ITreeNodeProps> = (props): JSX.Element => {
   const {
	  data,
	  onClick,
	  currentSelection
   } = props;

   const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
   const [isActive, setIsActive] = useState<boolean>(false);
   const [isChildActive, setIsChildActive] = useState<boolean>(false);

   const hasSubmenu = useCallback(() => {
	  return data.children && data.children.length > 0;
   }, [data]);

   const getClassName = useCallback((): string => {
	  let value = '';

	  if (hasSubmenu()) {
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

		 if (hasSubmenu()) {
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
	  if (!hasSubmenu()) {
		 return false;
	  }

	  if (isChildActive) {
		 return true;
	  }

	  return isMenuVisible;
   }, [hasSubmenu, isMenuVisible, isChildActive]);

   return (
	  <li className={getClassName()}>
		 <i onClick={handleIconClick} className={'fa' + (showSubmenu() ? ' fa-arrow-down' : ' fa-arrow-right')} />
		 <a href="#" onClick={handleOnClick(data)}>
			{data.text}
		 </a>
		 {
			showSubmenu() &&
			<ul key={uniqueId('tree-menu')}>
			   {
				  data.children.map(item => <TreeNode key={item.id}
				                                      data={item}
				                                      currentSelection={currentSelection}
				                                      onClick={onClick} />)
			   }
			</ul>
		 }
	  </li>
   );
};

export {TreeNode};

