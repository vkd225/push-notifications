import React, { useState, useEffect } from 'react';
import NotificationResponse from './NotificationResponse'
import { UploadImage }  from '../services/UploadImage';

export default function  Notification (props: any) {
  let data = props
  const [oneSignalImageURL, setOneSignalImageURL] = useState(false);

  const initialImageUploadingState = ''

  const { awsS3URL, loadingImageURL } = UploadImage(data.chrome_web_image_base64, initialImageUploadingState)

  useEffect (() => {
    if (loadingImageURL === 'returned'){
      setOneSignalImageURL(true)
    } else {
      setOneSignalImageURL(false)
    }
  }, [loadingImageURL]);

  return (
    <div>
      {
        (oneSignalImageURL) ?
          <NotificationResponse {...data} awsS3URL={awsS3URL}/>
        :
        <p>Loading ...</p>
      }
    </div>
  );
}