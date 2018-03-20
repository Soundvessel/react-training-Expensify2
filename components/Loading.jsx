import React from 'react'
import { Image } from 'react-bootstrap'

const Loading = () => (
  <div className="text-center">
    <Image
      alt="Loading"
      src="/static/images/logo.svg"
      responsive
    />
    <h1>Loading...</h1>
  </div>
)

export default Loading
