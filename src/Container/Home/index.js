//importing  useeffect for calling api
import React, { useState ,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//importing cardmoviecomponent
import CardMoviesComponents from '../../Components/CardMovies';
//import axios  for calling api
import axios from 'axios';


import PaginationComponent from '../../Components/Pagination';
const HomeContainer = ()=>{
    //storing coming data
    //usestate stored as collection of object array
    //pageno data,  usestate value by default 1
    // we  set state of pagination to be active
    //
    const [content, setContent] = useState([]);
    const [pageno, setPageno]  = useState(1)
    //by default paginationon 0
    const [paginationno, setPaginationno] = useState(0);

    //we use value of apikey in .env file
    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;

    //async indicate until function doesnt complete it doesnt move forward.
    //inside  async we use await
    //await doesnt let page to next line until u get page response
    const GetDataTrending = async ()=>{
        //inside axios.get we use api url
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${pageno}`);
        //set data
        //we use useeffect(hooks) 
        //three life cycle in react 1.mount,update ,unmount
        //when app is loading which function to be run,which api to call which is called component didmount.
        //when component is loading ,if event is triggered or state update or fetching data and 
        //every work  until unmounting then it is component didupdate.
        //then unmounting the code
       
        //setting coming data
        //setting result data
        setContent(data.results);
        setPaginationno(data.total_pages);
        console.log('data', data);
    }
   

    //we call getdatatrending  in useeffect function to call allapi of trending movies
    useEffect(()=>{
        console.log('Trending Component did mount');
         GetDataTrending();
          //when app is loading first time we have to take data
           //eslint-disable-next-line
             
    }, [])

    const handleClick = (number)=>{
        //setpageno
        setPageno(number);
    }

    useEffect(()=>{
        console.log('Trending Component didupdate mount');
       //for changing pageno again api is called , pageno is updated and again data should be called.so it work as didupdate
        GetDataTrending();
        //eslint-disable-next-line
    }, [pageno])

    return(
        <main className='homePage'>
        <Container>
            <Row>
                <Col className='col-12'>
                <section>
                            <h1 className='txtCenter'>Top Trending </h1>
                            <h3 className='txtCenter'>Tv and Movie For You</h3>
                        </section>
                </Col>
                {
                        //callback function in content.map
                        content && content.length > 0 ? content.map((item)=>{
                            return (
                                //we use key as this can be repeated
                                //we use data to get item and mediatype supposing tv
                            <CardMoviesComponents key={item.id} data={item}mediaType="tv" />
                            )
                        })
                        //else
                        : 'Loading ....'
                    }
                    {
                       // <PaginationComponent/>
                       //for pagnation no >1 in paginationcomponent function maxnum paginationno,activenum = pagenum ,handleclick=handleclick function
                       paginationno && paginationno > 1 ? <PaginationComponent maxnum={paginationno} activenum={pageno} handleClick={handleClick}/> : ''
                    }
            </Row>
        </Container>
        </main>
    )
}

export default HomeContainer;