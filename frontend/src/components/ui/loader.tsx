import React from 'react'
import "@/app/styles/loading.css"

export const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__bar"></div>
      <div className="loader__bar"></div>
      <div className="loader__bar"></div>
      <div className="loader__bar"></div>
      <div className="loader__bar"></div>
      <div className="loader__ball bg-orange-500"></div>
    </div>
  )
}
