import React, { useState } from 'react';

import { useForm } from '../custom_hooks/useForm';
import { useCheckbox } from '../custom_hooks/useCheckbox';
import Notification from './Notification';
import { InitialNotification, InitialErrors, InitBrowsersEnabled } from './../data/InitialData'

import { GoogleChromeIcon, FirefoxIcon, EdgeIcon, PushButton } from './../assets/Icon';

import './../App.css';

export default function CreateForm() {

    const [notification, submitNotification] = useState(false);

    const initialState = InitialNotification
    const initialErrors = InitialErrors
    const initBrowsersEnabled = InitBrowsersEnabled

    const pushNotification = () => {
        submitNotification(true)
    }

    const pusAnotherNotification = () => {
        submitNotification(false)
    }

    // event handlers from useForm
    const { handleChange, handleImageChange, onSubmit, values,  errors} = useForm (
        pushNotification, initialState, initialErrors
    );

    //event handlers for checkbox
    const { handleCheckboxChange, browserErrors, browsers} = useCheckbox (
        initBrowsersEnabled, initialErrors
    );

    let data = {
        headings: {"en": values.title},
        contents: {"en": values.message},
        chrome_web_image: values.imgPreview,
        isChromeWeb: browsers.chrome,
        isFirefox: browsers.firefox
        // isWP_WNS: true
    }

    return (
        <div>
            {!notification ?
            <form onSubmit={onSubmit}>
                <h2>Push a notification to your app</h2>
                <div>
                    <input name='title' id='title' type='text' placeholder='Title of your notification'
                        onChange={handleChange}
                        required
                    />
                    {(errors.titleLength && <p className='Error'>Your title should not be more than 100 characters.</p>)}
                </div>

                <div>
                    <input name='message' id='message' type='text' placeholder='Message'
                        onChange={handleChange}
                        required
                    />
                    {(errors.messageLength && <p className='Error'>Your message should not be more than 180 characters.</p>)}
                </div>

                <div>
                    <input type="url" placeholder="Copy Image URL" onChange={handleImageChange}/>
                    Or
                    <label> Upload image: </label>
                    <input id='picture' type='file'
                        onChange={handleImageChange}
                        accept="image/*"
                        title="Upload an image"
                    />
                </div>

                <div style= {{ margin: 10}}>
                    <input type='checkbox' checked={browsers.chrome} className='Checkmark' name='googleChrome'
                        onChange={handleCheckboxChange}
                    />
                    <GoogleChromeIcon className='BrowserIcon'/>

                    <input type='checkbox' checked={browsers.edge} className='Checkmark' name='edge'
                        onChange={handleCheckboxChange}
                    />
                    <EdgeIcon className='BrowserIcon' />

                    <input type='checkbox' checked={browsers.firefox} className='Checkmark' name='firefox'
                        onChange={handleCheckboxChange}
                    />
                    <FirefoxIcon style={{ height: '40px', width: '40px'}} />

                    {(browserErrors.noBrowserSelected) ?
                    <p className='Error' style={{ padding: 20 }}>You have to select at least one browser.</p>
                    :
                    (errors.messageLength || errors.titleLength) ?
                    <div>
                        <p className='Error' style={{ padding: 20 }}>Please fix the error above.</p>
                    </div>
                    :
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                    }
                </div>

                <div>{(values.img !== '' && <img src={values.imgPreview} alt={values.img.name} className='Preview'/>)}
                </div>

            </form>

            :
            <div>
                <Notification {...data} notification={notification}/>
                <div style={{ margin: 20, marginTop: 50, left: '10%', position: 'absolute' }}>
                    <PushButton className='ButtonIcon' onClick={pusAnotherNotification} style ={{ cursor: 'pointer' }}/><span style= {{ verticalAlign: 'middle', fontWeight: 'bold' }}>Push one more</span>
                </div>
            </div>
            }
        </div>
    );
}
