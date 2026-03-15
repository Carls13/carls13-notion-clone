import { createContext, useContext } from "react";

import { usePageState } from "./usePageState";
import type { Page } from "../utils/types";
import { withInitialState } from "./withInitialState";

type AppStateContextType = ReturnType<typeof usePageState>;

const AppStateContext = createContext<AppStateContextType>({} as AppStateContextType);

type AppStateProviderProps = {
    children: React.ReactNode;
    initialState: Page;
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(({ children, initialState }: AppStateProviderProps) => {
    const pageStateHandlers = usePageState(initialState);

    return (
        <AppStateContext.Provider value={pageStateHandlers}>
            {children}
        </AppStateContext.Provider>
    );
    }
);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppState = () => useContext(AppStateContext);