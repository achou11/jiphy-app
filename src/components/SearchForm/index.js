import * as React from 'react'

import { usePrevious } from '../../helpers'
import { Button } from '../../components'

import './SearchForm.css'

const BASE_ENDPOINT = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=`

const getImageProperties = gifObject => {
  const { id, title } = gifObject

  // Using the fixed height rendition based on the Giphy docs
  // https://developers.giphy.com/docs/optional-settings/#rendition-guide
  const { url, width, height } = gifObject.images.fixed_height
  return { id, title, url, width, height }
}

const SearchForm = ({ setIsLoading, setGifs }) => {
  const [inputValue, setInputValue] = React.useState('')
  const [searchValue, setSearchValue] = React.useState('')
  const previousSearchValue = usePrevious(searchValue)

  const search = event => {
    event.preventDefault()

    // We noop when the user doesn't change the input value on the following attempt
    if (previousSearchValue === inputValue) return

    setSearchValue(inputValue)

    const cachedQueryResult = localStorage.getItem(inputValue)

    if (cachedQueryResult) {
      setGifs(JSON.parse(cachedQueryResult))

      // Remove the cached query from local storage
      // so that we refetch the next time happens,
      // which could be useful for updating stale data.
      localStorage.removeItem(inputValue)
      return
    }

    setIsLoading(true)

    fetch(`${BASE_ENDPOINT}${encodeURIComponent(inputValue)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("couldn't fetch data")
        }
        return res.json()
      })
      .then(parsed => {
        const { data } = parsed

        if (data.length > 0) {
          const result = data.map(gifObject => getImageProperties(gifObject))

          setGifs(result)
          localStorage.setItem(inputValue, JSON.stringify(result))
        }
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className='SearchForm'>
      <form className='SearchForm' onSubmit={search}>
        <label htmlFor='giphy-search'>Search Giphy: </label>
        <input
          autoFocus
          id='giphy-search'
          type='text'
          name='giphy-search'
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
        <Button
          disabled={
            inputValue.length === 0 || previousSearchValue === inputValue
          }
          onClick={() => {}}
        >
          Submit
        </Button>
      </form>
      {searchValue && (
        <p>
          Showing results for: <em>{searchValue}</em>
        </p>
      )}
    </div>
  )
}

export { SearchForm }
