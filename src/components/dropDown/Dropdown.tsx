import React, {useState} from 'react';

function Dropdown({ options, onSelect, value }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || null);
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      setSelectedValue(option);
      onSelect(option);
      setIsOpen(false);
    };
  
    return (
      <div className="dropdown">
        <button onClick={handleToggle}>
          {selectedValue || 'Select an option'}
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            {options.map((option) => (
              <li key={option} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  export default Dropdown