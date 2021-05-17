import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

const SkeletonArticle = () => {
    return (
        <div className='skeleton-wrapper'>
            <div className='skeleton-article'>
                <Typography variant="h3">
                    <Skeleton  width={200}/>
                </Typography>
                <Skeleton id='manu' variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </div>
        </div>
    )
}

export default SkeletonArticle