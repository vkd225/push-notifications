import { useState, useEffect } from 'react';
import * as HttpStatus from 'http-status-codes';
import Config from '../Config';
import PushNotificationDataTypes from './../types/PushNotificationDataTypes';

export const PushNotification = (initialLoadingState: string, initialNotificationResponse: any, notificationData: PushNotificationDataTypes) => {
    const [response, setResponse] = useState(initialNotificationResponse);
    const [loading, setLoading] = useState(initialLoadingState);


    useEffect (() => {
      postNotification(notificationData)
    }, []);



    const postNotification = async (data: any) => {
        setLoading('loading')

        let headers = {
            "Content-Type": Config.content_type,
            "Authorization": "Basic " + Config.api_key
        };

        let url = Config.base_url + '/api/v1/notifications';

        let app_settings = {
          app_id: Config.app_id,
          included_segments: Config.included_segments
        }

        let app_data = {...app_settings, ...data}

        try {
          let result = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(app_data)
          });

          let res = await result.json()

          // Bail if status code is not OK
          // if (result.status === HttpStatus.StatusCodes.UNAUTHORIZED) {
          //   setResponse({ response: {...res, 'error': ['Unauthorized User']} });
          // } else if (result.status !== HttpStatus.StatusCodes.OK) {
          //   setResponse({ response: {...res, 'error': ['Bad  Parameters']} });
          // }

          // Read response
          setResponse({ response: res });
        } catch (error) {
          setResponse({ response: {'Message' : 'Failed to push notification'}, 'error': error });
        }

        setLoading('returned')
    }

    return {
      response,
      loading
    };
}