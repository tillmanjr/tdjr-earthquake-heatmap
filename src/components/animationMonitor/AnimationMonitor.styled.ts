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
  background: transparent;
  border-style: solid;
  border-radius: 8px;
  border-color: ${({ automationStatus }) => automationStatus==='idle' ? "gray" : "green"};
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
    background-color: transparent;
    color:  ${({ automationStatus }) => automationStatus==='idle' ? "gray" : "green"}; 
  }
  :nth-child(2){
    display: ${({ automationStatus }) => automationStatus==='idle' ? "block" : "none"}; 
    position: absolute;
    top: 20px;
    width: 100%;
    height: 0.10rem;
    background-color: transparent;
    color:  ${({ automationStatus }) => automationStatus==='idle' ? "gray" : "transparent"}; 
  }
  :nth-child(3){
    position: absolute;
    display: ${({ automationStatus }) => automationStatus==='idle' ? "none" : "block"}; 
    top: 20px;
    width: 100%;
    height: 0.10rem;
    background-color: transparent;
    color:  ${({ automationStatus }) => automationStatus==='idle' ? "transparent" : "green"}; 
  }
  :nth-child(4){
    position: absolute;
    display: ${({ automationStatus }) => automationStatus==='idle' ? "none" : "block"}; 
    top: 38px;
    width: 100%;
    height: 0.10rem;
    background-color: transparent;
    color:  ${({ automationStatus }) => automationStatus==='idle' ? "transparent" : "green"}; 
  }
`;