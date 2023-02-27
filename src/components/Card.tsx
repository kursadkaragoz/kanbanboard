import React from 'react'

export default function Card(props : any) {
  return (
    <div className="p-7 mt-2 rounded-lg bg-gray-500">{props.children}</div>
  )
}

