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

    const handleImageChange = (event: any) => {
        if (event.target.type === 'url') {
            setValues({...values,
                imgPreview: event.target.value,
                img: event.target.value
            });
        } else if (event.target.type === 'file' && event.target.files.length) {
            setValues({...values,
                imgPreview: URL.createObjectURL(event.target.files[0]),
                img: event.target.files[0]
            });
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