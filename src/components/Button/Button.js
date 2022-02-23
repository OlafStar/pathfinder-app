import styled from 'styled-components';

export const Button = styled.button`
  background: none;
  border: 2px solid black;
  padding: 15px 25px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  @media (max-width: 600px) {
    padding: 5px 15px;
    font-size: 0.5rem;
  }
`;
