import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './general.css'

function Input({ label, type, className, value, setValue, icon, inputAttributes }) {
  const handleInput = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <div className="input-box">
        {icon && <FontAwesomeIcon icon={icon} className="input-icon" />}
        <input
          {...inputAttributes}
          type={type}
          className={`text-input ${className || ''}`}
          value={value}
          onChange={handleInput}
        />
      </div>
    </div>
  )
}

export default Input
