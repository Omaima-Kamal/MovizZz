import React from 'react'
import '../../css/Home.css';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }
    return (

        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img className='d-block w-100 h-20' src={require("../../assets/images/1.jpg")} alt='First slide' />
                {/*    <Carousel.Caption>
                     <h3>First slide label</h3>
                     <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                   </Carousel.Caption>
    */}
            </Carousel.Item>
            <Carousel.Item>
                <img className='d-block w-100 h-20' src={require("../../assets/images/2.jpg")} alt='Second slide' />
            </Carousel.Item>
            <Carousel.Item>
                <img className='d-block w-100 h-20' src={require("../../assets/images/3.png")} alt='Third slide' />
            </Carousel.Item>
            <Carousel.Item>
                <img className='d-block w-100 h-20' src={require("../../assets/images/4.jpg")} alt='Fourth slide' />
            </Carousel.Item>
            <Carousel.Item>
                <img className='d-block w-100 h-20' src={require("../../assets/images/5.jpg")} alt='Fifth slide' />
            </Carousel.Item>
        </Carousel>

    )
}
export default Home;