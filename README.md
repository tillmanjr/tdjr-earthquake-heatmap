# Earthquake Heatmap - West Coast USA, 2019-2025  

## A Heatmap of earthquakes in Western USA and NorthWestern Mexico  
  
### Data includes earthquakes occurring in:  
* California  
* southern Oregon  
* Nevada  
* a bit of northwestern Mexico.  
  
### Filtering of displayed earthquakes
Easily filter by several criteria:    
* dates (range)  
* intensity  
* depth 

### Animations through time  
Two available animation modes show earthquakes data as it changes through time:  
* interval  
* accumulation  
  
### Data Limitations  
All earthquakes in the covered region  
*  from 2019.01.01 to 2025.01.01  
*  with a magnitide (intensity) >= 2.5  
*  depth >= 5.7 km  
  
<hr />  

## How-to  

### Settings - Control Panel)  
Any change made to a setting are immediately reflected on the heatmap.

#### Map Section  
Adjusts the appearance of earthquake data as displayed on the map.  
- Radius  

- Opacity  
  
### Filtering what's shown    
  
#### Intensity  
Intensity refers to the intensity of an earthquake on the Richter scale.  
Earthquakes having an intensity between the Intensity filter's _Min_ and _Max_ settings are shown on the heatmap.  
Those outside the range defined by the Intensity filter's settings are not shown.  
  
#### Depth    
Depth refers to depths below the surface measured in kilometers.  
Earthquakes having an epicenter between the Depth filter's _Min_ and _Max_ settings are shown in the heatmap.  
Those outside the range defined by the Depth filter's settings are not shown.    
   
#### Date Range    
Date Range defines a period of time which starts on the _Min_ date and ends at the _Max_ date settings.    
Earthquakes occurring within the period defined by the Date Range filter are shown on the heatmap.  
Those outside the period defined by the Date Range filter are not shown.  
  
## Animations    
Animations automate the heatmap to show changes in through time.  
Animations step through time at the rate of one step per second.  
Each animation step calculates a new date -__Step's Date__- based on the previous step's date and using with the values set below.
  
#### Days per step:  
Each animation step moves forward in time by a number of days, from one __Step's Date__ to the next __Step's Date__. 
The number of days a step moves forward is set by the __Days per step__ setting.  
* __examples__  
  * __Days per step__ to 1 will move time forward by one day each second the animation is running.  
  * __Days per step__ to 7 will move time forward by 7 days, a week, each second the animation is running.   

 #### Days displayed    
 _Interval animations only!_  
 Each animation step shows new earthquake data for a period ending at the new __Step's Date__.  
 __Days displayed__ controls how many days of earthquake data are displayed for each step.  
 * __examples__   
 _assume an animation __Step's Date__ of 2020.02.15_
   * __Days displayed__ to 1 will display earthquakes occuring on 2020.02.15
   * __Days displayed__ to 7 will display earthquakes occuring on during the period of 2020.02.08 through 2020.02.15.  

### Animation Type  
#### Interval  
Each animations step displays only earthquakes occuring within the period set by the current __Step's date__ and the __Days per step__  setting.  

#### Accumulation     
Each animation step displays all earthquakes occurring within the period set by the start of the animation through the current __Step's date__.  
__Days displayed__  has no effect of this type of animation.   
* __example__  
Assume the animation starts on 2019.01.01 and __Days per step__ is set to 1.  
    - the first step's  __Step's Date__ will be 2019.01.02, the heatmap will show earthquakes occurring 2019.01.01 through 2019.01.02.  
    - the second step's __Step's Date__ will be 2019.01.03, the heatmap will show earthquakes occurring 2019.01.01 through 2019.01.03.  
    - the third step's  __Step's Date__ will be 2019.01.04, the heatmap will show earthquakes occurring 2019.01.01 through 2019.01.04.  
    - ...  
    - the seventh step's  __Step's Date__ will be 2019.01.08, the heatmap will show earthquakes occurring 2019.01.01 through 2019.01.08.  
    - ...  

### Running animations  
Start animations by activating the __Start Animation__ button.  
Stop animations by activating the __Stop Animation__ button.     
__Note:__  _Stop running animations before changing any settings._

Hiding the Control Panel will not interrupt a running animation.  
While animations are running a monitor in the upper left of the map will track the animation's progress.  
The monitor will track a running animation whether or not the Control Panel is hidden.    

<img  src="https://github.com/tillmanjr/tdjr-earthquake-heatmap/blob/main/assets/ControlPanelVisible.png?raw=true" width="40%" />
<img  src="https://github.com/tillmanjr/tdjr-earthquake-heatmap/blob/main/assets/ControlPanelHidden.png?raw=true" width="40%"  />
<br />
<img  src="https://github.com/tillmanjr/tdjr-earthquake-heatmap/blob/main/assets/AnimationRunning_ControlPanelVisible.png?raw=true" width="40%"  />
<img  src="https://github.com/tillmanjr/tdjr-earthquake-heatmap/blob/main/assets/AnimationRunning_ControlPanelHidden.png?raw=true" width="40%"  />
<br />