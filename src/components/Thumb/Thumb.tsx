//Link Router
import { Link } from 'react-router-dom';


//style
import { Image } from './Thumb.styles.js';
import { FunctionComponent } from 'react';


interface ThumbProps {
    image: string;
    movieId: number;
    clickable: boolean;
}


const Thumb: FunctionComponent<ThumbProps> = ({image , movieId, clickable}) => (
    <>
        {
            clickable ? (
                <Link to={`/${movieId}`}>
                    <Image src={image} alt='movie thumb'/>
                </Link>
            ) : 
            ( <Image src={image} alt='movie thumb'/> )
        }
    </>
);


export default Thumb;