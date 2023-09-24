import React from 'react';

import DesignEditor from 'src/views/DesignEditor';
import ImageSlider from 'src/views/PreviewComic/ImageSlider';
// import '../src/views/PreviewComic/ImageSlider.css'

const Landing = () => {
    const images = [
        'https://via.placeholder.com/500x300?text=Image+1',
        'https://via.placeholder.com/500x300?text=Image+2',
        'https://via.placeholder.com/500x300?text=Image+2',
        'https://via.placeholder.com/500x300?text=Image+2',
        'https://via.placeholder.com/500x300?text=Image+2',
        'https://via.placeholder.com/500x300?text=Image+2',
        'https://via.placeholder.com/500x300?text=Image+3'
    ];

    return (
        <div>
            <ImageSlider images={images} />
        </div>
    );
};

export default Landing;
