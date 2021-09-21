export const movies = {
    search: '/search/movie',
    details: (id) => {
        return `/movie/${id}`;
    },
    credits: (id) => {
        return `/movie/${id}/credits`;
    },
};

export const favorites = {
    create: '/api/favorites',
    show: (id) => {
        return `/api/favorites/${id}`;
    },
    delete: (id) => {
        return `/api/favorites/${id}`;
    },
    list: '/api/favorites',
    find: '/api/favorite/find',
    pageMovies: '/api/favorites/page-movies',
};
