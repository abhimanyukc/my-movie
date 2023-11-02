//npm i react-alice-carousel for costar
import AliceCarousel from 'react-alice-carousel';
//importing react-alice-carousel css
import 'react-alice-carousel/lib/alice-carousel.css';
import './style.css';
import {img_300, no_picture} from '../../config';

//for clicking on image provide e.preventdefault
const handleDragStart = (e) => e.preventDefault();

function DarkVariantExample({data}) {
    //when this component is called in other component data is passed as a props 
    //console.log('cast',data);
    
   
    //responsive variable
   const responsive = {
    // for screen size very small 1 item display
    0: {
        items: 1,
    },
    // for screen size 320 2 item display
    320: {
        items: 2,
    },
    640: {
        items: 3,
    },
    900: {
        items: 4,
    },
    1024: {
        items: 5
    },
    1280: {
        items: 6
    }
  }
  const items = data.map((item)=>{
    return(
        <div className="carouselItem">
            {/*ondraging coostar image handledragstart function called  , src= item.profile_path otherwsie no picture*/}
            <img onDragStart={handleDragStart}  src={item.profile_path ? `${img_300}/${item.profile_path}`:no_picture} 
            alt={item.name} title={item.name} />
        
        <div className='carouselItemText'>
            <div>Name :- {item.name}</div>
            <div>Department :-  {item.known_for_department}</div>
        </div>
    </div>
   ) 
})
    return (
      <div className='myCarWrap'>
        <h2>Co-Star Informations</h2>
        {/*react alice carousel with configuration responsive,autoplay interval in 5 sec etc. */}
        <AliceCarousel 
        responsive={responsive}
        autoPlay={true}
        autoPlayInterval={5000}
        infinite={true}
        disableButtonsControls
        disableDotsControls
        mouseTracking 
        items={items} />
      </div>
    );
  }
  
  export default DarkVariantExample;