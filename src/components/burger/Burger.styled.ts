import styled from 'styled-components'

interface StyledBurgerComponentProps {
    open: boolean,
    onClick
}

export const StyledBurger = styled.button<StyledBurgerComponentProps>`
  position: absolute;
  top: 5px;
  left: 5px;;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 102;

  :hover {
    background-color: black;
  }
    :focus {
    background-color: black;
  }

  span {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme, open }) => open ? "gray" : theme.primaryLight};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;