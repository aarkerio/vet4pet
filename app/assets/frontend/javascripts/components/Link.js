import React, { PropTypes } from 'react'

const Link = ({ active, children, onClick }) => {
  // already completed
  if (active) {
    return <span>{children} Link component</span>
  }

  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    > Link component
      {children}
    </a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link
