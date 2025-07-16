import React, { useEffect, useState } from 'react'
import Search from './components/Search'

const API_BASE_URL= 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async() => {
    setIsLoading(true)
    setErrMessage('')
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const res = await fetch(endpoint, API_OPTIONS)

      if(!res.ok){
        throw new Error('Failed to fetch Movies')
      }
      
      const data = await res.json()

      // console.log(data)

      if (data.Response === 'False') {
        setErrMessage(data.Error || 'Failed to fetch movies')
        setMovieList([])
        return
      }

      setMovieList(data.results || [])

    } catch (error) {
      console.log(error)
      setErrMessage('Error fetching Movie, Please Try Again!')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <main>

      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'> Movies</span> You'll Enjoy Without the Hassle</h1>
          
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {/* <h1 className="text-white">{searchTerm}</h1> */}
        <section className='all-movies'>
          <h2>All Movies</h2>

          {isLoading ? (
            <p className='text-white'>Loading...</p>
          ) : errMessage ? (
            <p className='text-red-500'>{errMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p key={movie.id} className='text-white'>{movie.title}</p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
