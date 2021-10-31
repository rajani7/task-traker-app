import React from 'react'
import reactDom from 'react-dom'
import '../style/modal.scss'
const Modal = ({ children, isOpen }) => {
  const container = document.getElementById('modalRef')

  if (!isOpen) {
    return null
  }

  const child = (
    <div className="customModal">
      <div className="customModal-content border border-2 p-4 bg-white">{children}</div>
    </div>
  )

  return reactDom.createPortal(child, container)
}

export default Modal
