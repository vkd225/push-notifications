import { useEffect } from 'react';
import { useState } from 'react';

import Config from '../Config';
import * as HttpStatus from 'http-status-codes';

export const UploadImage = (imgBase64: any, initialImageUploadingState: string) => {

    const [awsS3URL, getAwsS3URL] = useState('');
    const [loadingImageURL, setLoading] = useState(initialImageUploadingState);

    useEffect (() => {
        uploadImage(imgBase64)
    }, []);

    const uploadImage = async (data: any) => {
        setLoading('loading')
        let url = Config.base_url_upload_image + '/uploadimage';

        if (data.startsWith('data:image')) {
            try {
                let result = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(imgBase64)
                });

                // Bail if status code is not OK or unauthorized
                if ((result.status).toString() === (HttpStatus.StatusCodes.UNAUTHORIZED).toString()) return undefined;
                if ((result.status).toString() !== (HttpStatus.StatusCodes.OK).toString()) return undefined;

                // Read response
                let response = await result.json();
                getAwsS3URL(response.toString());

            } catch (error) {
                getAwsS3URL('Invalid URL');
            }
        } else {
            getAwsS3URL(data);
        }
        setLoading('returned')
    }

    return {
        awsS3URL,
        loadingImageURL
    }
}