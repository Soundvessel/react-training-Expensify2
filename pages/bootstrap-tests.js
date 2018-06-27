import React from 'react'
import Head from 'next/head'
import requireFireAuth from '../lib/requireFireAuth'
import {
  Container,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

const BootstrapTests = () => (
  <>
    <Head>
      <title>Bootstrap 4 Testing</title>
      {/* Bootstrap 4 CDN */}
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
        crossOrigin="anonymous"
      />
    </Head>
    <Container className="py-5">
      <h2>Pagination?</h2>
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink href="#">Previous</PaginationLink>
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
    </Container>
    {/*language=SCSS*/}
    <style jsx global>{`
      // reset REM units for Bootstrap
      body {
        font-size: 16px;
      }
    `}</style>
  </>
)

export default BootstrapTests