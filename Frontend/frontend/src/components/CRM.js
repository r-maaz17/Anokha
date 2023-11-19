import React, { startTransition } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import ImageUploader from './apis/amazon';

export const CRM = (props) => {
    return (
        <div>
            <ImageUploader />
        </div>
    );
}
