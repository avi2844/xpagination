import "./Pagination.css"
function Pagination({updatePage, currentPage, totalPages}){

    const handlePrev = () =>{
        if(currentPage > 1){
            updatePage(prev => prev - 1)
        }
    }

    const handleNext = () => {
        if(totalPages != currentPage){
            updatePage(prev => prev + 1);
        }
    }

    return(
        <div>
            <button onClick={handlePrev}>Previous</button>
            <span>{currentPage}</span>
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default Pagination;