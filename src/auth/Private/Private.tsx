import type { ReactElement } from "react"
import { useAuthSession } from "../AuthSessionContext";
import { Navigate } from "react-router-dom";

type PrivateProps = {
    component: ReactElement;
}

export const Private = ({ component }: PrivateProps) => {
    const { loading, session } = useAuthSession();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <Navigate to="/auth" />;
    }

    return component;
}