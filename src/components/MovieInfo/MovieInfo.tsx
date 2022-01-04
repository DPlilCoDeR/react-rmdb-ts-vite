import { FunctionComponent } from 'react';

//Styles
import { Wrapper, Content, Text } from './MovieInfo.styles';

//Thumb
import Thumb from '../Thumb/Thumb'

//asset config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

//NoImage
import NoImage from '../../images/no_image.jpg';
import { Movie, Crew } from '../../types';

//Components
import Rate from '../Rate/Rate'


interface MovieInfoProps {
    movie: Movie & {
        directors: Crew[]
    }
}

const MovieInfo: FunctionComponent<MovieInfoProps> = ({movie}) => (
    <Wrapper backdrop={movie.backdrop_path}>
        <Content>
            <Thumb 
                image={
                    movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : NoImage
                }
                clickable={false} 
                movieId={movie.id}
            />
            <Text>
                <h1>{movie.title}</h1>
                <h3>PLOT</h3>
                <p>{movie.overview}</p>

                <div className='rating-directors'>
                    <div>
                        <h3>RATING</h3>
                        <div className='score'>{movie.vote_average}</div>
                    </div>
                    <div className='director'>
                        <h3>DIRECTOR{movie.directors.length > 1 ? 'S' : ''}</h3>
                        {movie.directors.map(director => (
                            <p key={director.credit_id}>{director.name}</p>
                        ))}
                    </div>
                </div>
                <div>
                    <p>Rate movie</p>
                    <Rate/>
                </div>
            </Text>
        </Content>
    </Wrapper>
);


export default MovieInfo