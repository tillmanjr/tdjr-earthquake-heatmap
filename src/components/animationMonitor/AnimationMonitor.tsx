import React from 'react';
import PropTypes from 'prop-types'
import { StyledAnimationMonitor } from './AnimationMonitor.styled'

const AnimationMonitor = ({ automationStatus, automationType, automationTotalSteps, automationCurrentStep, dateMin, dateMax, ...props }) => {
  
  //const isExpanded = open ? true : false;
  const animationTypeText = automationStatus === 'idle' ? '' : ` (${automationType})`
  return (
    <StyledAnimationMonitor
        automationStatus={automationStatus}
        // open={open}
        // onClick={() => setOpen(!open)}
        {...props}
    >
      <div> Animation{animationTypeText}</div>
      <div> {automationStatus} </div>
      <div>
        Step {automationCurrentStep} of {automationTotalSteps}
      </div>
      <div>
        {dateMin.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} - {dateMax.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
      </div>
    </StyledAnimationMonitor> 
  )
}

AnimationMonitor.propTypes = {
    automationStatus: PropTypes.string.isRequired,
    automationType: PropTypes.string.isRequired,
    automationTotalSteps: PropTypes.number,
    automationCurrentStep: PropTypes.number,
    dateMin: PropTypes.instanceOf(Date),
    dateMax: PropTypes.instanceOf(Date)
};

export default AnimationMonitor;