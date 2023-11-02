import React, {useEffect} from 'react';
//useeffect to call for api
//importing listgroup of bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import './style.css';
import axios from 'axios';
//npm i react-icons
//using BsFillXCircleFill icon of react-boottstrap
import {BsFillXCircleFill } from "react-icons/bs";

const LeftListBarComponent = (
    {
        //getting thorugh props
        selectedGenres,
        setSelectedGenres,
        genres,
        setGenres,
        type,
        setPage
        }
)=>{

    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;
    

    const GetDataList = async ()=>{
        //inside this api we get data inside it we have genres
        //in axios link we  use type of genre 
        const {data:{genres}} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`);
        //console.log('genres', genres);
        setGenres(genres)
    }
    useEffect(()=>{

        
        GetDataList();
        return ()=>{
            //in third life cyclee
           //return empty
            setGenres({});
        }
        //eslint-disable-next-line
    }, [])

    // function for adding category
    const handleAdd = (genre)=>{
        setSelectedGenres([...selectedGenres, genre])
        //console.log('oldSelectedGenres', selectedGenres)
        setGenres(genres.filter((g)=>{ return g.id !== genre.id}));
        return setPage(1)
    }
    //function for removing selecting category through filter
    const handleRemove = (genre)=>{
        setSelectedGenres(
            selectedGenres.filter((g)=>{ 
                return g.id !== genre.id
            })
        )
        //console.log('oldSelectedGenres', selectedGenres)
        setGenres([...genres,genre]);
        return setPage(1)
    }

    return (
        <aside className='asideBar'>
            <h3>Filter By :- </h3>
            
            <ListGroup>
                {
                    selectedGenres && selectedGenres.map((item)=>{
                        return (
                            <ListGroup.Item className='selected' onClick={()=>{return handleRemove(item)}} key={`${item.id}newtag`}>
                                {item.name}
                                <i><BsFillXCircleFill /></i>
                            </ListGroup.Item>
                        )
                    })
                }
                {
                    genres && genres.length > 0 ? genres.map((item)=>{
                        return(
                            <ListGroup.Item key={item.id} onClick={()=>{return handleAdd(item)}}>
                                {item.name}
                            </ListGroup.Item>
                        )
                    }) : 'Lading content...'
                }
            </ListGroup>
        </aside>
    )
}

export default LeftListBarComponent;