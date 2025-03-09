import React from 'react'

export default function Card({ title, children }) {
  return (
    <div className="card size-52 bg-neutral-900 p-5 rounded-lg flex flex-col-reverse justify-between">
        <h3 className="text-center">{title}</h3>
        {children}
    </div>
  )
}
