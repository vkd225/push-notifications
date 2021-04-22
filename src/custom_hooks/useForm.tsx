import { useState } from 'react';

import Error from '../types/ErrorTypes';
import CreateNotifications from '../types/CreateNotifications';

export const useForm = (submitNotification: any, initialState: CreateNotifications, initialErrors: Error) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();

        setValues({ ...values, [event.target.name]: event.target.value });

        // Error handling for inputs
        if (event.target.name === 'title' && event.target.value.length > 100) {
            setErrors({ ...errors, titleLength: true});
        } else if (event.target.name === 'title' && event.target.value.length <= 100) {
            setErrors({ ...errors, titleLength: false });
        }

        if (event.target.name === 'message' && event.target.value.length > 180) {
            setErrors({ ...errors, messageLength: true });
        } else if (event.target.name === 'message' && event.target.value.length <= 180) {
            setErrors({ ...errors, messageLength: false });
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (values.imgPreview === null ) {
            setValues({...values,
                imgPreview: '',
                img: ''
            });
        }
        await submitNotification();
    };

    const setImageData = async (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onload = () => {
            let fileInfo = {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1000) + ' kB',
                base64: reader.result,
                file: file,
            };

            setValues({...values,
                img: fileInfo.base64,
                imgPreview: URL.createObjectURL(file)
            });
        }
    }

    const handleImageChange = async (event: any) => {
        if (event.target.type === 'url') {
            setValues({...values,
                imgPreview: event.target.value,
                img: event.target.value
            });
        } else if (event.target.type === 'file' && event.target.files.length) {
            let file = event.target.files[0]
            await setImageData (file)
        }
    };

    return {
        handleChange,
        handleImageChange,
        onSubmit,
        values,
        errors
    };
}