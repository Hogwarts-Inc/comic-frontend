import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos as ArrowLeftIcon, ArrowForwardIos as ArrowRightIcon } from '@mui/icons-material';
import styles from './ImageSlider.module.css';

interface ImageSliderProps {
    images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [current, setCurrent] = useState<number>(0);

    const handlePrev = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    const handleNext = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    return (
        <div className={styles.sliderWrapper}>
            <div className={styles.sliderContent} style={{ transform: `translateX(-${current * 100}%)` }}>
                {images.map((image: string, index: number) => (
                    <img
                        key={index}
                        src={image}
                        alt=""
                        className={`${styles.imageSlide} ${index === current ? styles.active : ""}`}
                    />
                ))}
            </div>
            <IconButton className={styles.arrow + " " + styles.left} onClick={handlePrev}>
                <ArrowLeftIcon fontSize="large" />
            </IconButton>
            <IconButton className={styles.arrow + " " + styles.right} onClick={handleNext}>
                <ArrowRightIcon fontSize="large" />
            </IconButton>
        </div>
    );
};

export default ImageSlider;
