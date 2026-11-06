import './general.css'

function SelectInput({ label, options = [], className, value, setValue }) {
  const handleSelect = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <div className="input-box">
        <select
          className={`text-input ${className || ''}`}
          value={value}
          onChange={handleSelect}
        >
          {options.map((option) => {
            // string ("latest") ou objet { value, label } si on veut un texte plus lisible
            const optionValue = option.value ?? option
            const optionLabel = option.label ?? option

            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default SelectInput
