import React from 'react'
import { BsDot } from 'react-icons/bs'

const MovieModal = ({movie: {title, vote_average, poster_path, release_date, original_language, overview}, onClose}) => {
    return (
        <div className='fixed inset-0 bg-dark-100/85 flex items-center justify-center z-50'>
            <div className='bg-gray-100 rounded-2xl p-8 max-w-2xl relative'>
                <button className="absolute top-2 right-4 font-bold text-gray-600 hover:text-dark-100" onClick={onClose}>
                    ✕
                </button>

                <div className="flex items-center justify-center gap-4">

                    <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} className="rounded-lg h-auto max-w-xs" />

                    <div className="flex flex-col flex-1">

                        <h3 className="text-2xl font-bold mb-2 text-dark-200">{title}</h3>


                        <div className="flex items-center gap-2 text-gray-700 mb-6">
                                <img src="star.svg" alt="Star Icon" />
                                <p>{vote_average ? vote_average.toFixed(1) : 'N/A' }</p>

                                <span><BsDot size={20} /></span>
                                <p className='lang'>{original_language}</p>

                                <span><BsDot size={20} /></span>
                                <p className='year'>{release_date ? release_date : 'N/A'}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <p>{overview ? overview : 'N/A'}</p>
                        </div>
                
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MovieModal
