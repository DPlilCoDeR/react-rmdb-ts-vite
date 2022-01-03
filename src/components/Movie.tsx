import { Component } from "react";
import { Params, useParams } from "react-router-dom";

//config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

//Components
import BreadCrumb from "./BreadCrumb/BreadCrumb";
import Grid from "./Grid/Grid";
import Spinner from "./Spinner/Spinner";
import MovieInfo from "./MovieInfo/MovieInfo";
import MovieInfoBar from "./MovieInfoBar/MovieInfoBar";
import Actor from "./Actor/Actor";

//API
import api from "../API";

//Hook
//import { useMovieFetch } from "../Hooks/useMovieFetch";

//Not image
import NoImage from '../images/no_image.jpg'

import { Movie as MovieType, Cast, Crew } from '../types'

interface MovieParams {
    params: any;
}

class Movie extends Component <MovieParams, {}> {
    state = {
        movie: {} as MovieType & {
            actors: Cast[],
            directors: Crew[]
        },
        loading: true,
        error: false,
    }

    
    fetchMovieData = async () => {
        const {movieId} = this.props.params;

        try {
            const movie: MovieType = await api.fetchMovie(movieId);
            const credits = await api.fetchCredits(movieId);
            const directors = credits.crew.filter((member: Crew) => 
                member.job === 'Director');

            this.setState({
                movie: {
                ...movie,
                actors: credits.cast,
                directors 
            },
                loading: false
            })

        } catch (error) {
            this.setState({error: true, loading: false});
        }
    };

    componentDidMount(){
        this.fetchMovieData();
    }

    render(){
        const {movie, loading, error} = this.state

        if (error) return <div>somenthing went wrong...</div>
        if (loading) return <Spinner />;
    
    return (
        <>
            <BreadCrumb movieTitle={movie.title}/>
            <MovieInfo movie={movie}></MovieInfo>
            <MovieInfoBar 
                time={movie.runtime} 
                budget={movie.budget} 
                revenue={movie.revenue}
            />
            <Grid header='actors'>
                {movie.actors.map((actor: Cast) => (
                    <Actor 
                        key={actor.credit_id}
                        name={actor.name}
                        character={actor.character}
                        imageUrl={
                            actor.profile_path 
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                            : NoImage
                        } 
                    />
                ))}
            </Grid>
        </>
    );
    }
    
}

const MovieWithParams = (props: {}) => <Movie {...props} params={useParams()}/>;

export default MovieWithParams;