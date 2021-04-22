import React, { useEffect } from "react";
import Config from '../Config';
import { PushNotification }  from '../services/PushNotification';
import { UploadImage }  from '../services/UploadImage';

export default function  Notification (props: any) {
  let data = props

  const initialNotificationResponse = {}
  const initialLoadingState = ''
  const initialImageUploadingState = ''

  const { awsS3URL, loadingImageURL } = UploadImage(data.chrome_web_image_base64, initialImageUploadingState)

  let data_awsS3URL = {
    chrome_web_image: awsS3URL
  }
  let notification_data = {...data, ...data_awsS3URL}

  const { response, loading } = PushNotification(initialLoadingState, initialNotificationResponse, notification_data)
  console.log('Image', loadingImageURL)

  return (
    <div>
      {
        (loading === '' || loading === 'loading') ?
          <p>Loading ...</p>
        :
        (loading === 'returned' && ('errors' in response.response)) ?
          <div>
            <h3>Error: </h3>
            <p>{JSON.stringify(response.response.errors[0])}</p>
          </div>
        :
        (loading === 'returned' && ('id' in  response.response) && response.response.id !== '') ?
          <div>
            <h3>Your notification Link: </h3>
            <span>https://app.onesignal.com/apps/{Config.app_id}/notifications/{response.response.id}</span>
          </div>
        :
        (loading === 'returned') ?
        <div>
          <h3>Error: </h3>
          {JSON.stringify(response.response)}
        </div>
        :
        null
      }
    </div>
  );
}