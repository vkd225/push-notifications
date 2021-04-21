import { useState , useEffect} from 'react';

import Error from '../types/ErrorTypes';
import Browser from '../types/BrowserTypes'

export const useCheckbox = (initBrowsersEnabled: Browser, initialErrors: Error) => {
    const [browserErrors, setErrors] = useState(initialErrors);
    const [browsers, setBrowsers] = useState(initBrowsersEnabled);

    useEffect(() => {
        if (!browsers.chrome && !browsers.edge && !browsers.firefox) {
            setErrors({...browserErrors, noBrowserSelected: true});
        } else {
            setErrors({...browserErrors, noBrowserSelected: false});
        }
    }, [browsers.chrome, browsers.edge, browsers.firefox]);

    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'googleChrome' && event.target.type === 'checkbox') {
            setBrowsers({...browsers, chrome: !browsers.chrome });
            await checkIfBrowserSelected();
        }

        if (event.target.name === 'firefox' && event.target.type === 'checkbox') {
            setBrowsers({...browsers, firefox: !browsers.firefox });
            await checkIfBrowserSelected();
        }

        if (event.target.name === 'edge' && event.target.type === 'checkbox') {
            setBrowsers({...browsers, edge: !browsers.edge });
            await checkIfBrowserSelected();
        }
    };

    const checkIfBrowserSelected = async () => {
        if (!browsers.chrome && !browsers.edge && !browsers.firefox) {
            setErrors({...browserErrors, noBrowserSelected: true});
        } else {
            setErrors({...browserErrors, noBrowserSelected: false});
        }
    }

    return {
        handleCheckboxChange,
        browsers,
        browserErrors
    };
}