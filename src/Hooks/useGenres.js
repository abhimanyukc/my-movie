//
const useGenres = (selectedGenres)=>{
    //for no selectedgenres
    if(selectedGenres < 1) return '';
//otherwise we use map in selectedgenres and return g.id and passed to genresid 
//genresid is returned  as in collection of array and in thath  genresid we use reduce method with returning  acc + curr
//reduce method give single result
    const GenreIds = selectedGenres.map(g=>{return g.id})
    return GenreIds.reduce((acc, curr)=>{
        return acc + ','+ curr;
    }) 
}

export default useGenres;