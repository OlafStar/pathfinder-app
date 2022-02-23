import { Button } from 'components/Button/Button';
import React from 'react';
import { MenuWrapper } from './Menu.style';

const Menu = ({ visualizeDjikstra, setStart, setFinish }) => {
  return (
    <MenuWrapper>
      <Button onClick={visualizeDjikstra}>Djikstra</Button>
      <Button onClick={() => setStart(true)}>Change start</Button>
      <Button onClick={() => setFinish(true)}>Change Finish</Button>
    </MenuWrapper>
  );
};

export default Menu;
