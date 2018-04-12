import React from 'react'

const Loading = () => (
  <div className="loader">
    <img className="loader__image" src="/static/images/loader.gif" />
    {/*language=SCSS*/}
    <style jsx>{`

      @import '../styles/global/variables';

      .loader {
        align-items: center;
        display: flex;
        height: 100vh;
        justify-content: center;
        width: 100vw;
      }

      .loader__image {
        height: 6rem;
        width: 6rem;
      }

    `}</style>
  </div>
)

export default Loading
