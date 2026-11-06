import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './general.css'

function Button({ label, className, onClick, icon }) {
  return (
    <button className={`btn ${className || ''}`} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {label}
    </button>
  )
}

export default Button
