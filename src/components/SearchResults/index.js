import * as React from 'react'

import './SearchResults.css'

const SearchResults = ({
  addBookmark,
  bookmarks,
  gifs,
  isLoading,
  removeBookmark
}) =>
  isLoading ? (
    <div className='SearchResults loading'>Loading...</div>
  ) : (
    <div className='SearchResults'>
      {gifs.map(gif => {
        return (
          <img
            key={gif.id}
            alt={gif.title}
            src={gif.url}
            height={gif.height}
            width={gif.width}
          />
        )
      })}
    </div>
  )

export { SearchResults }
