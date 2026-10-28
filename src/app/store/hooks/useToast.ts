import { useEffect, useState } from "react";

const TOAST_DURATION = 3000;

export const useToast = () => {
    const [message, setMessage] =
        useState<string | null>(null);

    const showToast = (
        text: string
    ): void => {
        setMessage(text);
    };

    useEffect(() => {
        if (!message) {
            return;
        }

        const timer = setTimeout(() => {
            setMessage(null);
        }, TOAST_DURATION);

        return () => clearTimeout(timer);
    }, [message]);

    return {
        message,
        showToast,
    };
};