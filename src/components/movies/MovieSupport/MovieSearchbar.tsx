import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel, FormControl } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCircleHeart as solidFaCircleHeart } from '@fortawesome/pro-solid-svg-icons';
import { faShuffle, faCircleHeart as lightFaCircleHeart } from '@fortawesome/pro-light-svg-icons';

interface Props {
    onShowSidebar: () => void;
    sortingStandard: string;
    onSortingStandard: (standard: string) => void;
    sortingDirection: string;
    onSortingDirection: (direction: string) => void;
    onShuffle: () => void;
    onToggleFavorite: () => void;
    showOnlyFav: boolean;
    moviesLength: number;
    isForUser: boolean;
}

const MovieSearchbar: React.FC<Props> = (props) => {
    const {
        onShowSidebar,
        sortingStandard,
        onSortingStandard,
        sortingDirection,
        onSortingDirection,
        onShuffle,
        onToggleFavorite,
        showOnlyFav,
        moviesLength,
        isForUser,
    } = props;

    return (
        <div className="select-wrapper">
            <button className="btn-filter" onClick={onShowSidebar}>
                <i className="fa fa-filter" />
                &ensp;Filter
            </button>
            <FormControl
                className="movie-select"
                variant={sortingStandard ? 'filled' : 'standard'}
                sx={{ m: 1, minWidth: 120, fontSize: 13 }}
            >
                <InputLabel id="simple-sort-standard-label">Sort by</InputLabel>
                <Select
                    label="Sort by"
                    labelId="simple-sort-standard-label"
                    id="simple-sort-standard"
                    defaultValue=""
                    value={sortingStandard}
                    onChange={(e: SelectChangeEvent) => {
                        onSortingStandard(e.target.value as string);
                    }}
                >
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                </Select>
            </FormControl>
            <FormControl
                className="movie-select"
                variant={sortingDirection ? 'filled' : 'standard'}
                sx={{ m: 1, minWidth: 120 }}
            >
                <InputLabel id="simple-sort-direction-label">Direction</InputLabel>
                <Select
                    label="Direction"
                    labelId="simple-sort-direction-label"
                    id="simple-sort-direction"
                    defaultValue=""
                    value={sortingDirection}
                    onChange={(event: SelectChangeEvent<unknown>) => {
                        onSortingDirection(event.target.value as string);
                    }}
                >
                    <MenuItem value="ASC">Ascending</MenuItem>
                    <MenuItem value="Des">Descending</MenuItem>
                </Select>
            </FormControl>

            {isForUser && (
                <div className="favorite-icon-wrapper" onClick={onToggleFavorite}>
                    {showOnlyFav ? (
                        <>
                            <FontAwesomeIcon
                                className="icon icon-right"
                                icon={solidFaCircleHeart}
                            />
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon
                                className="icon icon-right"
                                icon={lightFaCircleHeart}
                            />
                        </>
                    )}
                </div>
            )}

            <div className="shuffle-icon-wrapper" onClick={onShuffle}>
                <FontAwesomeIcon className="icon" icon={faShuffle as IconProp} />
            </div>

            <span>{moviesLength} Movies</span>
        </div>
    );
};

export default MovieSearchbar;
