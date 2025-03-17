export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    Headers: { 
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const getMovies = async({query}: {query:string}) => {
    const endpoint = 
    query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
    `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`;
    const response = await fetch(endpoint, {
       method: 'GET',
       headers: TMDB_CONFIG.Headers
    });

    if(!response.ok) {
        //@ts-ignore
        throw new Error("Failed to fetch movies", response.statusText)
    }

    const data = await response.json();
    return data.results;
}



// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzAzNzhmMDYzNDc3ZmNkMTNjYjAwNTMyOTFmMmZlYiIsIm5iZiI6MTc0MTg3MDA0Ni4zMzYsInN1YiI6IjY3ZDJkM2RlZTE4OGVhYTQ3YzFkZDk4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dK1ryhuDyK5TGE4-rZ1LTBqq_6fosyh5SNePW-nBt2M'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));