console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.BandsInTown = {
    id: `https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp`
}

exports.omdb = {
    id: "https://www.omdbapi.com/?t=&y=&plot=short&apikey=trilogy"
}