import { Component } from 'react';

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

//API
import API from '../API';

// Components
import HeroImage from './HeroImage/HeroImage';
import Grid from './Grid/Grid';
import Thumb from './Thumb/Thumb';
import Spinner from './Spinner/Spinner';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import NotFound from './NotFound';

// Image
import NoImage from '../images/no_image.jpg';
import { Movie, Movies } from '../types';


interface HomeState {
    movies: Movies,
    searchTerm: string,
    isLoadingMore: boolean,
    loading: boolean,
    error: boolean
};


const initialState: Movies = {
  page: 0,
  results: [] as Movie[],
  total_pages: 0,
  total_results: 0
};

class Home extends Component<{}, HomeState> {
  state: HomeState = {
    movies: initialState,
    searchTerm: '',
    isLoadingMore: false,
    loading: false,
    error: false
  };

  fetchMovies = async (page: number, searchterm = '') => {
    try {
        this.setState({loading: true, error: false})

        const movies: Movies = await API.fetchMovies(searchterm, page);

        this.setState(prev => ({
            ...prev,
            movies: {
              ...movies,
              results:
                  page > 1 ? [...prev.movies.results, ...movies.results]: [...movies.results]
            },
            loading: false,
        }));
    } catch (error) {
        this.setState({error: true});
    }
  };

  handleSearch = (searchTerm: string) => 
    this.setState({ movies: initialState, searchTerm}, () =>
      this.fetchMovies(1, this.state.searchTerm)
    )

  handleLoadMore = () => 
    this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm)


  componentDidMount = () => this.fetchMovies(1);
  
  render() {
    const { searchTerm, movies, error, loading } = this.state;

    if (error) { return <NotFound/> };
  
  return (
    <>

    {!searchTerm && movies.results[0] ? (
      <HeroImage 
        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
        title={movies.results[0].original_title}
        text={movies.results[0].overview} />
    ) : null }

      <SearchBar setSearchTerm={this.handleSearch}/>

    <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
      {movies.results.map(movie => (
        <Thumb 
          key={movie.id} 
          clickable //True
          image={
            movie.poster_path 
            ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
            : NoImage
            }
          movieId={movie.id}
        />
      ))
      }
    </Grid>
    {this.state.loading && <Spinner/>}
    {movies.page < movies.total_pages && !loading && (
      <Button text='Load More' callback={this.handleLoadMore}/>
    )}
    </>
  );
  }
    
    
};

export default Home;