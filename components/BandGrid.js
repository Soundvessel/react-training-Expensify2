import React from 'react'
import { Link } from '../routes'

// polyfill for <picture> element and srcset/size attributes for IE11
if (process.browser) {
  require('picturefill');
}

const BandGrid = ({pcBands}) => (
  <div className="content-container">
    <section className="band-grid">
      {
        pcBands.length > 0 ? (
            pcBands.map(( {uid, name, thumbUrlSm, thumbUrlLg, thumbAlt }) => (
              <figure className="brand-grid__band" key={`band-${uid}`}>
                <Link route="band" params={{slug: uid}}>
                  <a className="brand-grid__link">
                    <img src={thumbUrlLg} alt={thumbAlt} srcSet={`${thumbUrlSm}, ${thumbUrlLg} 2x`} />
                  </a>
                </Link>
                <figcaption>{name}</figcaption>
              </figure>
            ))
        ) : (
          <p>No Bands</p>
        )
      }
      {/*language=SCSS*/}
      <style jsx>{`

        @import '../styles/global/variables';

        $band-grid-pad: 5px;

        .band-grid {
          display: flex;
          flex-wrap: wrap;
          margin-left: -$band-grid-pad;
          margin-right: -$band-grid-pad;
        }

        .brand-grid__band {

          margin: 0;
          width: 50%;
          padding: $band-grid-pad;
          display: flex;
          flex-direction: column;

          @media (min-width: $desktop-breakpoint) {
            width: 25%;
          }

          img {
            width: 100%;
            height: auto;
            display: block;
          }

          figcaption {
            font-size: $font-size-xs;
            padding: $s-size $s-size $m-size;
            background-color: $off-white;
            text-align: center;
            flex: 1;
          }
        }

      `}</style>
    </section>
  </div>
)

export default BandGrid