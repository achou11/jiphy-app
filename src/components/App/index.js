import * as React from 'react'

import './App.css'

import {
  Header,
  Pagination,
  SearchForm,
  SearchResults
} from '../../components/'

const PAGE_LIMIT = 8

const App = () => {
  const [gifs, setGifs] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)

  const totalPages = Math.ceil(gifs.length / PAGE_LIMIT)

  const indexOfLastGif = currentPage * PAGE_LIMIT
  const indexOfFirstGif = indexOfLastGif - PAGE_LIMIT
  const displayedGifs = gifs.slice(indexOfFirstGif, indexOfLastGif)

  // We clear local storage on app load for the purpose of demoing the solution.
  React.useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <div className='App'>
      <Header />
      <SearchForm setGifs={setGifs} setIsLoading={setIsLoading} />

      <div className='grid-item'>
        <SearchResults isLoading={isLoading} gifs={displayedGifs} />
      </div>

      <div className='grid-item'>
        {gifs.length > 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  )
}

export { App }
