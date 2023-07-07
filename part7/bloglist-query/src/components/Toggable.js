import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types' //not necessary, just for enforcing props

const Toggable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(true)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div className="flex ">
      <div>
        <button
          style={{ display: visible ? '' : 'none' }}
          className=" hover:text-purple-300  hover:border-purple-300 transition duration-150 font-medium border rounded-md p-1 px-3 my-2"
          onClick={toggleVisibility}
        >
          {props.text}
        </button>
      </div>
      <div style={{ display: !visible ? '' : 'none' }}>
        {props.children}
        <button
          className=" hover:text-purple-300  hover:border-purple-300 transition duration-150 font-medium border rounded-md p-1 px-3 my-2"
          onClick={toggleVisibility}
        >
          Cancel
        </button>
      </div>
    </div>
  )
})

Toggable.propTypes = {
  text: PropTypes.string.isRequired,
}

Toggable.displayName = 'Toggable'

export default Toggable
