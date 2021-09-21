export const movieCardImageUrl = (backdropPath = "") => {
    if (!(backdropPath?.length > 4)) {
        return '/images/missing.png';
    }

    return `${process.env.MIX_MOVIEDB_IMAGES}/w400${backdropPath}`;
};

export const moviePosterImage = (posterPath = "", size = "w400") => {
    return `${process.env.MIX_MOVIEDB_IMAGES}/${size}${posterPath}`;
};
