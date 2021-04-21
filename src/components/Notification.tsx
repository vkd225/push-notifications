import React from "react";
import Config from '../Config';
import { PushNotification }  from '../services/PushNotification';
import { PushButton } from './../assets/Icon';



export default function  Notification (props: any) {
  const data = props

  const initialNotificationResponse = {}
  const initialLoadingState = ''

  const { response, loading } = PushNotification(initialLoadingState, initialNotificationResponse, data)

  const doSomeThing = () => {
    console.log('change state here')

  }

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
      <div style={{ margin: 20, marginTop: 50, left: '10%', position: 'absolute' }}>
        <PushButton className='ButtonIcon' onClick={doSomeThing} style ={{ cursor: 'pointer' }}/><span style= {{ verticalAlign: 'middle', fontWeight: 'bold' }}>Push one more</span>
      </div>
    </div>
  );
}