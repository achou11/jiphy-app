import * as React from 'react'

import { Button } from '../../components'

import './Pagination.css'

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
  <div className='Pagination'>
    <div className='buttons-container'>
      <Button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </Button>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>

    <p>
      Page {currentPage} of {totalPages}
    </p>
  </div>
)

export { Pagination }
