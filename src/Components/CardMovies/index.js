import React from 'react'
//link for no reloading
import {Link} from 'react-router-dom';
//import images domainame
import { img_300, img_not_available } from '../../config';
//we are getting data and mediatype through props
const CardMoviesComponents = ({data, mediaType})=>{
         console.log('data',data)
     const id = data.id;
     //defining mediatype
     //we use ternary operator coz if mediatype then mediatype passed, if data.type then data.type passed 
     //other mediaType which is used through props will be passed
     const media_type = data.media_type ? data.media_type : data.type? data.type : mediaType;

     //if data.poster_path available then get img_300 +data.poster_path
     //else imgnotavailable
     const ImageURL = data.poster_path ? img_300 + data.poster_path : img_not_available;
//take title as  data.orgnaltitle or data.name
     const title = data.original_title || data.name;

     //we get vote_average from api
     //in javascript  function we use parseint not to display floating format
     const vote_average = parseInt(data.vote_average);
//getting original language or empty
     const original_language = data.original_language ||  '';
     //either release_date or first_air_date
     const release_date =  data.release_date || data.first_air_date;
    return (
        //styling for card in grid system layout
 
        //inside link  we use dynamic url with backtick` 
        //inside` we used details, id variable with $, mediatype variable with $
        //we use figure tag to get image
        //videoimg class
        //circle-rate for video rate inside it we used svg for rounded
        //implementing format of svg
        <>

            
              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6'>

             <Link to ={`/details/${id}/${media_type}`} className='video-thumb'>
                <figure className='video-image'>
                    <span>
                        <img src={ImageURL} alt={title} />
                    </span>
                    
                    <div className='circle-rate'>
                        
                    <svg className="circle-chart" viewBox="0 0 30 30" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                <circle className="circle-chart__background" stroke="#2f3439" strokeWidth="2" fill="none" cx="15" cy="15" r="14"></circle>
                                <circle className="circle-chart__circle" stroke="#4eb04b" strokeWidth="2" strokeDasharray={`${vote_average}0,100`} cx="15" cy="15" r="14"></circle>
                            </svg>

                       <b>
                        {vote_average}
                       </b>
                    </div>


                    <div className='hd'> {media_type }
                    <b>{original_language}</b>
                    </div>
                </figure>

                <div className='video-content'>
                    <ul className='tags'>
                        <li> Release Date</li>
                    </ul>
                    <small className='range'>{release_date}</small>
                    <h3 className='name'>
                        {title}
                    </h3>
                </div>

             </Link>
                </div>       
        </>
    )

}
export default CardMoviesComponents;