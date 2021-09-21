class MovieDbPager {
    page = 1;
    results = [];
    total_pages = 0;
    total_results = 0;

    constructor(responseObject = null) {
        if (!responseObject) {
            return;
        }

        for (let [prop, value] of Object.entries(this)) {
            if (!responseObject.hasOwnProperty(prop)) {
                continue;
            }

            this[prop] = responseObject[prop];
        }
    }
}

export default MovieDbPager;
