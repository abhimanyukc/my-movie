import React from "react"
//for pagine we install react-paginate dependency
//npm i react-paginate
import ReactPaginate from "react-paginate";
import './style.css';

const PaginationComponent = (props)=>{
    //passing props
    // get maximum no , activeno,handleclick through props
    const {maxnum, activenum, handleClick} = props
    //active no in integer -1
    const forcePageActive = parseInt(activenum) - 1;

    const handlePageClick = (e)=>{
        console.log('hello', e.selected)
        let pageNo = parseInt(e.selected) + 1
        //pageno passed in handleclick
        handleClick(pageNo);
        //when pahe clicked scrolled to top and get all that data
        window.scrollTo(0, 0)
    }
      
    
    return(
        <>
            <div className="paginationWap">
                <ReactPaginate
                //configurations
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    pageCount={maxnum}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                    renderOnZeroPageCount={null}
                    forcePage={forcePageActive}
                />
            </div>
        </>
    )
}

export  default PaginationComponent;