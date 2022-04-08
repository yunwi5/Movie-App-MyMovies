import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-duotone-svg-icons';

import { ProcessedMovie, ScrapedMovie, Status } from '../../../models/helperModels';
import { getStringForQuery } from '../../../utilities/string-util';
import { processMovieData } from '../../../utilities/movie-util/movies-util';
import LoadingSpinner from '../DesignElement/LoadingSpinner';
import { Size } from '../../../models/styleModels';

interface Props {
	onSearch: (searchResult: any) => void;
	className?: string;
}

const fetchMovieInfo = async (apiDomain: string, movieQueryString: string) => {
	const res = await fetch(`${apiDomain}/search/${movieQueryString}`);
	return await res.json();
};

const FormSearchbar: React.FC<Props> = (props) => {
	const { onSearch, className } = props;
	const [ searchWord, setSearchWord ] = useState('');
	const [ searchStatus, setSearchStatus ] = useState({ status: Status.INITIAL, message: '' });

	const searchHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!searchWord) return;

		const queryString = getStringForQuery(searchWord);
		let result: ProcessedMovie;
		setSearchStatus({ status: Status.LOADING, message: 'On searching...' });
		try {
			const apiDomain = process.env.REACT_APP_SERVER_API_URL || '';
			const data: ScrapedMovie = await fetchMovieInfo(apiDomain, queryString);
			if (!data.title)
				throw new Error('Movie was not found. Please check your title carefully.');
			result = processMovieData(data);
			setSearchStatus({
				status: Status.SUCCESS,
				message: 'Successfully got movie information!',
			});
			onSearch(result);
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Finding movie did not work.';
			setSearchStatus({ status: Status.ERROR, message });
		}
	};

	const searchTextHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchWord(e.target.value);
		setSearchStatus({
			status: Status.INITIAL,
			message: 'Make sure your movie title is accurate!',
		});
	}, []);

	return (
		<form className={`form-search ${className}`} onSubmit={searchHandler}>
			<label htmlFor='form-search' className='form-search__label'>
				Try Search
			</label>
			<div className='form-search__input-box'>
				<input
					type='text'
					placeholder='Try search your movie you want.'
					onChange={searchTextHandler}
					defaultValue=''
					className='form-search__input'
					id='form-search'
				/>
				<button
					type='submit'
					className='form-search__btn btn-secondary-fill'
					disabled={searchStatus.status === Status.LOADING}
				>
					<FontAwesomeIcon icon={faSearch} className='form-search__icon' />
				</button>
			</div>
			<div className={`form-search__message`}>
				{searchStatus.message && (
					<p className={`message-${searchStatus.status}`}>
						{searchStatus.message}
						{searchStatus.status === Status.LOADING && (
							<LoadingSpinner size={Size.SMALL} style={{ marginLeft: '10px' }} />
						)}
					</p>
				)}
			</div>
		</form>
	);
};

export default FormSearchbar;
