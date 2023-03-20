import { useEffect, useState } from 'react';

export const useCurrentTime = () => {
    const callback = () => new Date().toLocaleTimeString('ru-RU');
    const [currentTime, setCurrentTime] = useState(callback);

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(callback), 1000);
        return () => clearInterval(interval);
    });

    return currentTime;
};
