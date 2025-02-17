import styled from 'styled-components';

interface StyledControlPanelComponentProps {

}
// <div className="control-panel" style={{width: "320px", color: "black", alignSelf: "flex-end", bottom: "20px"}}>
/*
Vibrant
#ecebeb
#ECCDAF
#E9DB9D
#B7C59A
#B6BCB7
Contrasting
#B5B1B6
#D4D0D5
#E9DB9D
#8BB9BC
#79A7AA
---------
VIBRANT
#A5574E    - reddish
#A57225    - orangish
#A29919    - yellowish w green
#567E21    - greenish
#34754B    - greenish with a bit of blue

*/

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
    outline: none;
    cursor: auto;
    

    color: #A57225;
    background: #0f0f0f;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;

    border-style: solid;
    border-radius: 24px;
    border-color: #A29919;
    border-width: medium;

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

    button {
        background-color: #AAAAAA;
        border-color: #060606;
        color: black;
        border-radius: 8px;
        cursor: pointer;
    }
    button:hover {
        background-color: DDDDDD;
    }

    input {
        background-color: black;
        color: #BBBBBB;;
        border-color: #020202;
    }

    .react-datetime-picker__button {
        background-color: transparent;
    }
    svg {
        stroke: #A57225;
        background-color: transparent;
    }

   .react-datetime-picker__wrapper {
        background-color: black;
        color: #BBBBBB;;
        border-color: #020202;
    }
    .control-panel-section-heading {
        text-decoration-line: underline;
    }
}
    



 

  `
/*
    
    
    
 
*/