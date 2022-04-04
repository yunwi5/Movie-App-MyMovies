import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Movie from '../../../models/Movie';
import {
	getShortMovieDescription,
	toDurationString,
} from '../../../utilities/movie-util/movies-util';

const PosterCard: React.FC<{ movie: Movie }> = ({ movie }) => {
	const durationString = toDurationString(movie.duration);

	return (
		<li key={movie.id} className='movie'>
			<div
				className='movie__img'
				style={{
					backgroundImage: `url(${movie.imgUrl})`,
					backgroundSize: 'cover',
				}}
			/>
			<div className='movie__content'>
				<h5 className='movie__title'>{movie.title}</h5>
				<div className='movie__content__info'>
					<time className='movie__time'>
						{movie.year}
						{movie.duration && (
							<Fragment>
								&nbsp;
								<i className='fa fa-circle' />
								&nbsp;
								{durationString}
							</Fragment>
						)}{' '}
					</time>
					<p>{movie.director}</p>
					<p>{getShortMovieDescription(movie.description, 11)}</p>
				</div>
				<Link
					to={`/movie-detail/store/${movie.id}`}
					className='movie__btn btn-dark-transparent'
				>
					Explore
				</Link>
			</div>
			{/* <div className="movie__content">
                <h3>{movie.title}</h3>
                <p>
                    <span>{toDurationString(movie.duration)}</span>
                    <span>{movie.year}</span>
                    <span>{movie.rating}</span>
                </p>
            </div> */}
		</li>
	);
};

export default PosterCard;
