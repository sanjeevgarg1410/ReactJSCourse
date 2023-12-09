import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SortControl from '../components/SortControl';
import MovieTile from '../components/MovieTile';
import { APP_URL } from '../const';
import GenreSelect from '../components/GenreSelect';
import SearchForm from '../components/SearchForm';
import styles from '../styles/MovieListPage.module.css'; // Make sure to use CSS Modules
import MovieDialog from '@/components/MovieDialog';

// Fetch movies server-side
export async function getServerSideProps({ query }) {
    const { sortBy = 'release_date', sortOrder = 'desc', search = '', filter = '' } = query;
    const queryParams = new URLSearchParams({ sortBy, sortOrder, search, filter }).toString();
    const url = `${APP_URL}/movies?${queryParams}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    return {
        props: {
            initialMovies: data.data,
            initialSortBy: sortBy,
            initialSortOrder: sortOrder,
            initialSearch: search,
            initialFilter: filter,
        },
    };
}

const MovieListPage = ({ initialMovies, initialSortBy, initialSortOrder, initialSearch, initialFilter }) => {
    const router = useRouter();
    const [movies, setMovies] = useState(initialMovies);
    const [sortSelection, setSortSelection] = useState(initialSortBy);
    const [searchBy, setSearchBy] = useState('title');
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [genre, setGenre] = useState(initialFilter);
    const [sortOrder, setSortOrder] = useState(initialSortOrder);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [movieEdit, setMovieEdit] = useState(null);
    const [displayMode, setDisplayMode] = useState('add'); // 'add', 'edit', 'details'

    const openDialog = (mode, movie = null) => {
        setIsDialogOpen(true);
        setDisplayMode(mode);
        setMovieEdit(movie);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setMovieEdit(null);
        router.push('/movies', undefined, { shallow: true });
    };

    // Redirects and URL updates should be done using the router object
    const openModal = (movieId) => {
        router.push(`/movies/${movieId}`);
    };

    // Rest of your methods adapted to Next.js...

    useEffect(() => {
        const currentQuery = router.query;
        if (sortSelection !== currentQuery.sortBy || sortOrder !== currentQuery.sortOrder || searchQuery !== currentQuery.search || genre !== currentQuery.filter) {
            const queryString = new URLSearchParams({
                sortBy: sortSelection,
                sortOrder,
                search: searchQuery,
                searchBy: searchBy,
                filter: genre,
            }).toString();

            router.replace({
                pathname: router.pathname,
                query: queryString,
            }, undefined, { shallow: true });
        }
    }, [sortSelection, sortOrder, searchQuery, genre, router])

    // Fetch data when filters change
    useEffect(() => {
        const fetchMovies = async () => {
            const queryParams = new URLSearchParams({
                sortBy: sortSelection,
                sortOrder,
                search: searchQuery,
                searchBy,
                filter: genre,
            }).toString();
            console.log("fetching movies");

            try {
                const response = await fetch(`${APP_URL}/movies?${queryParams}`);
                const data = await response.json();
                setMovies(data.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        if (router.isReady) {
            fetchMovies();
        }
    }, [router.isReady, router.query, sortSelection, sortOrder, searchQuery, genre]);


    const handlDelete = (id) => {
        const url = new URL(`${APP_URL}/movies/${id}`);
        fetch(url, {
            method: "DELETE"
        }).then(() => {
            const filteredMovies = movies.filter((movie) => movie.id !== id);
            setMovies(filteredMovies);
        });
    }

    const handleEditClick = (movieEdit) => {
        setMovieEdit(movieEdit);
        openDialog('edit', movieEdit);
    };

    const handleMovieSubmit = (newMovie) => {
        newMovie = { ...newMovie, genres: newMovie.genres?.split(","), runtime: Number(newMovie.runtime) }

        const url = new URL(`${APP_URL}/movies`);
        fetch(url, {
            method: "POST",
            body: JSON.stringify(newMovie),
            headers: {
                "content-type": "application/json"
            }
        }).then(res => res.json()).then((newMovie) => {
            const newMovies = [newMovie, ...movies,];
            setMovies(newMovies);
        })
    };

    const updateGenre = (genre) => {
        setSearchQuery('');
        genre === 'ALL' ? setGenre("") : setGenre(genre);
    }

    const onSearch = (searchQuery) => {
        setSearchQuery(searchQuery);
    }

    return (
        <div className={styles.container}>
            {/* <button onClick={() => router.push("/movies/new?sortBy=release_date&sortOrder=asc")}>Add Movie</button> */}
            <button onClick={() => openDialog('add')}>Add Movie</button>
            <SearchForm onSearch={onSearch} searchQuery={searchQuery} />
            <div className={styles.topHeader}>
                <GenreSelect genres={["ALL", "THRILLER", "COMEDY", "ACTION"]} selectedGenre={genre} onSelect={updateGenre} />
                <SortControl currentSelection={sortSelection} onSortChange={setSortSelection} />
            </div>
            <div className={styles.movieList}>
                {movies.map((movie) => (
                    <MovieTile key={movie.id} movieInfo={movie} onDelete={handlDelete} handleClick={() => openModal(movie.id)} handleEditClick={handleEditClick} />
                ))}
            </div>
            {isDialogOpen && (
                <MovieDialog
                    onSubmitHandler={handleMovieSubmit}
                    initialMovieInfo={movieEdit}
                    displayMode={displayMode}
                    onClose={closeDialog}
                />
            )}
        </div>
    );
};

export default MovieListPage;
