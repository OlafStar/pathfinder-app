import { Button } from 'components/Button/Button';
import React from 'react';
import { MenuWrapper } from './Menu.style';

const Menu = ({ visualizeDjikstra }) => {
  return (
    <MenuWrapper>
      <Button onClick={visualizeDjikstra}>Djikstra</Button>
    </MenuWrapper>
  );
};

export default Menu;
