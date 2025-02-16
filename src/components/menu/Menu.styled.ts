import styled from 'styled-components';

interface StyledMenuComponentProps {
    open: boolean
}

export const StyledMenu = styled.nav<StyledMenuComponentProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 380px;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 480px; {
      width: 480px;
    }

`;