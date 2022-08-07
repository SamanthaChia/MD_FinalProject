export default class Movie{
    constructor({id, title, poster_path, overview, genre_ids, genre, release_date, popularity, vote_count, vote_average})
    {
        this.id = id;
        this.title = title;
        this.poster_path = poster_path;
        this.overview = overview;
        this.genre_ids = genre_ids;
        this.genre = genre;
        this.release_date = release_date;
        this.popularity = popularity;
        this.vote_count = vote_count;
        this.vote_average = vote_average;
    }
}