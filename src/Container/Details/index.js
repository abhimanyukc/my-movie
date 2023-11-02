import React, { useState, useEffect } from 'react';
//we use usestate,useeffect to fetch api
//usestate is react hook that allow to add state to functional component
//the hook takes an initial state value as an argument and return updated state value whenever setter function called.
//placing useeffect inside a component let us accesss count state variable(or any props) right from  effect. we dont need special api to read it.it is already in function scope.
//useffect helps to perform side effects in functnal components.i.e any function to run after updating the DOM.takes two arguments a function and optional array
//useparams  hook is reactrouter hook  that allow you to access the parameter ofcuurent url.
//it can be useful if u want to dynamically render content based on url parameters
import {useParams } from 'react-router-dom';
//importing container ,row,col for grid layout
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './details.css';
//axios fro api fetching
import axios from 'axios';
import DarkVariantExample from '../../Components/Carousel';

//in homepage when clicked to media we showld know mediatype and movieid

//importing img for details page
import{img_300, img_not_available}  from '../../config';
const DetailsContainer = ()=>{
    //defining params
    const params = useParams();
    //defining content to get data
    const [content, setContent] = useState();
    //for video details
    const [video, setVideo] = useState();
    //for costar data
    const [credits, setCredits] =  useState();

    //getting title of media
    const titleName =  content && content.name && content.name !== '' ? content.name : content && content.title && content.title !== '' ?  content.title : '';
    //we get id
    const id = params.movieid || '';

    //we get mediatype or empty
    const _media_type = params.mediatype || '';
    //defining api key
    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;
    //fetchdata function
         //fetching ocntent data
    const fetchData = async ()=>{
        //it is api  to get content in left side
        try{
            //inside axios we use api url from which we r getting media_type,id,apikey
            const {data} = await axios(`https://api.themoviedb.org/3/${_media_type}/${id}?api_key=${API_KEY}&language=en-US`);
            //setting  contentdata
            setContent(data)

        }catch(error){
            console.error(error)
        }
    }

    const fetchVideo = async ()=>{
        //we use api to get video in right side
        //we use iframe to get data in right side
        try{
           
            //we get api in data
            //to use await we need to use async
            const {data} = await axios(`https://api.themoviedb.org/3/${_media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`);
             
            //setting video data
            //result print with array in 0 index.to play video we need key
            setVideo(data.results[0].key)

        }catch(error){
            console.error(error)
        }

    }

    const creditsFetch = async ()=>{
        //here we use api to get costar info from credits
        try{
          const {data} = await axios.get(`https://api.themoviedb.org/3/${_media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`);
          //get all data
          setCredits(data.cast);
          console.log('sdata',  data);
        }catch(error){
          console.error(error)
        }
    }

    

    useEffect(()=>{
        //all function called
        fetchData();
        fetchVideo();
        creditsFetch();
        //eslint configuration
        //eslint-disable-next-line
    }, [])

    const renderDataHtml = ()=>{
        //we define lots of variable as it is detail page
        //if content.poster_path available  , image url = image 300 otherwsie image not available
        const ImageURL = content.poster_path ? img_300 + content.poster_path : img_not_available;
        //we get tagline in content.tagline
        const tagline = content.tagline || '';

        const vote_average = parseInt(content.vote_average);
        const original_language = content.original_language || '';
        //if adult content 18+ otherwise 10+
        const adult = !content.adult ? '10+' : '18+';

        const origin_country = content.origin_country && content.origin_country[0] ? content.origin_country[0] : content.production_countries && content.production_countries[0] && content.production_countries[0].name ? content.production_countries[0].name : '';
        const overview = content.overview;
        const first_air_date = content.first_air_date || content.release_date;
        const  budget = content.budget || '';
        //defining genres for different item of media like documentary,crime etc
        const genres = content.genres && content.genres.length > 0 ? content.genres.map((item)=> <span  key={item.id}>{item.name}</span>) : '' ;
        return (
            <Row>
                <Col className='col-12'>
                    <h1>
                        {titleName} 
                        {
                            //if content.tagline not blank render in small otherwise display blank
                            tagline && tagline !== '' ? <small> {tagline}</small> : ''
                        }
                    </h1>
                </Col>
                <Col className='col-12 col-xl-6'>
                    <div className='card card--details'>
                        <div className='card__cover'>
                            <img src={ImageURL} alt="myimage" />
                        </div>
                        <div className='card__content'>
                            <div className="card__wrap">
                                <span className="card__rate"> {vote_average}</span>

                                <ul className="card__list">
                                    <li>{original_language}</li>
                                    <li>{adult}</li>
                                </ul>
                            </div>
                            <ul className="card__meta">
                                <li>
                                    <span>Genre:</span> 
                                    <span className='linkTag'>{genres}</span>
                                </li>
                                <li>
                                    <span>Type:</span> 
                                    <span className='linkTag'>{_media_type}</span>
                                </li>
                                
                                <li><span>Release year:</span> <span className='linkTag'>{first_air_date}</span></li>
                                {
                                    budget && budget !== '' ? <li><span>Budget:- </span>
                                    <span className='linkTag'> {budget}</span></li> : ''
                                }
                                
                                <li><span>Country:</span> <span className='linkTag'>{origin_country}</span> </li>
                            </ul>
                            <div className="description_readmore_wrapper ">
                                {overview}
                            </div>
                        </div>
                    </div>
                </Col>
                {/* for youtube,  */}
                <Col className='col-12 col-xl-6'>
                    <div className='frameSec'>
                        {/* <a rel="noreferrer" target="_blank" href={`https://www.youtube.com/watch?v=${video}`}>
                            <figure className="youtubeImage">
                                <span className='imageSec'>
                                    <img src={videoBgPoster} alt="" title="" />
                                </span>
                                <span className='iconYoutube'></span>
                            </figure>
                        </a> */}
                        {/*calling iframe of youtube with $video i.e we get video id */}
                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </Col>
            </Row>
        )
    }


    return(
        
        <>
         <main className='detailsPage'>
            <Container>
                {
                    //printing title otherwise loading 
                    titleName && titleName !==  '' ? renderDataHtml() : 'Loading...'
                }
                
            </Container>
            <section className='section'>
                <div  className='contentHead'>
                    <Container>
                        <Row>
                            <Col className='col-12'>
                                {
                                    //if credits length>0  then we call darkvariantexample component and credits data(for co-star) is passed else loading data
                                    //in carousel we create darkvariantexample function and call here
                                    credits && credits.length > 0 ? <DarkVariantExample data={credits} /> : 'Loading data...'
                                }
                                
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        </main>
        
        </>
    )
}

export default DetailsContainer;