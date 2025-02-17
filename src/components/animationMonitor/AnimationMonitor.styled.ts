import styled from 'styled-components'

interface StyledAnimationMonitorComponentProps {
    automationStatus: string
}

export const StyledAnimationMonitor = styled.button<StyledAnimationMonitorComponentProps>`
  position: absolute;
  top: 5px;
  left: 45px;;
  display: block;
  flex-direction: column;
  justify-content: space-around;
  width: 12rem;
  height: 4rem;
  background: #0f0f0f;
  border-style: solid;
  border-radius: 8px;
  border-color: ${({ automationStatus }) => automationStatus==='idle' ? "#202020" : "#34754B"};
  border-width: medium;

  cursor: default;
  padding: 2px;
  z-index: 102;

  :first-child {
    position: absolute;
    top: 2px;
    display: block;
    width: 100%;
    height: 0.10rem;
    font-weight: bold;
    background-color: #0f0f0f;
    color:  ${({ automationStatus }) => automationStatus==='idle' ? "#202020" : "#567E21"}; 
  }
  :nth-child(2){
    display: ${({ automationStatus }) => automationStatus==='idle' ? "block" : "none"}; 
    position: absolute;
    top: 20px;
    width: 100%;
    height: 0.10rem;
    background-color: #0f0f0f;
    color:  ${({ automationStatus }) => automationStatus==='idle' ? "#202020" : "transparent"}; 
  }
  :nth-child(3){
    position: absolute;
    display: ${({ automationStatus }) => automationStatus==='idle' ? "none" : "block"}; 
    top: 20px;
    width: 100%;
    height: 0.10rem;
    background-color: #0f0f0f;
    color:  ${({ automationStatus }) => automationStatus==='idle' ? "transparent" : "#567E21"}; 
  }
  :nth-child(4){
    position: absolute;
    display: ${({ automationStatus }) => automationStatus==='idle' ? "none" : "block"}; 
    top: 38px;
    width: 100%;
    height: 0.10rem;
    background-color: #0f0f0f;
    color:  ${({ automationStatus }) => automationStatus==='idle' ? "transparent" : "#567E21"}; 
  }

  svg {
    stroke: #567E21;
  }
`;