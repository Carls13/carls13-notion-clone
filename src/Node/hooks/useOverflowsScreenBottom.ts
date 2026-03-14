import { useEffect, useRef, useState } from "react";

export const useUserOverflowsScreenBottom = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [overflows, setOverflows] = useState(false);

    const calculateOverflows = () => {
        if (ref.current) {
            const { bottom } = ref.current.getBoundingClientRect();
            const { innerHeight } = window;

            setOverflows(bottom > innerHeight);
        }
    };

    useEffect(calculateOverflows, []);

    return { overflows, ref };
};
    