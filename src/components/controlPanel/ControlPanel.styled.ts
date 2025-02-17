import styled from 'styled-components';

interface StyledControlPanelComponentProps {
    
}
// <div className="control-panel" style={{width: "320px", color: "black", alignSelf: "flex-end", bottom: "20px"}}>

export const StyledControlPanel = styled.div<StyledControlPanelComponentProps>`
    position: absolute;
    align-self: flex-end;
    margin: 24px;
    padding: 12px 24px;
    width: 320px;
    right: 0;
    bottom: 20px;
    font-size: 14px;
    line-height: 18px;
    color: black;
    background: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    outline: none;
    cursor: auto;

    h3 {
        font-size: 1.2em;
        font-weight: 500;
        margin: 8px 0;
    }

    h4 {
        font-weight: 500;
        margin: 8px 0;
    }

    p {
        margin-bottom: 16px;
    }

  `