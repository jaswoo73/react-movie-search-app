const MovieCard = ({ movie, InfoIcon, NoImageIcon }) => {
  return (
    <div className="movie">
      <div>
        <p>{movie.Year}</p>
        <a
          href={`https://www.imdb.com/title/${movie.imdbID}/`}
          target="_blank"
          rel="noreferrer"
          title="See more info at IMDB"
        >
          <img src={InfoIcon} alt="More Info" />
        </a>
      </div>
      <div>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : NoImageIcon}
          alt={movie.Title}
        />
      </div>
      <div>
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
