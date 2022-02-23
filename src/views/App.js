import { GlobalStyle } from 'assets/styles/globalStyles';
import { theme } from '../assets/styles/theme';
import styled, { ThemeProvider } from 'styled-components';
import Pathfinder from 'components/Pathfinder/Pathfinder';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Wrapper>
      <Pathfinder></Pathfinder>
    </Wrapper>
  </ThemeProvider>
);

export default App;
