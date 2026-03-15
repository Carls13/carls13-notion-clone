import type { ReactElement } from "react"
import { useAuthSession } from "../AuthSessionContext";
import { Navigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

type PrivateProps = {
    component: ReactElement;
}

export const Private = ({ component }: PrivateProps) => {
    const { loading, session } = useAuthSession();

    if (loading) {
        return <Loader />;
    }

    if (!session) {
        return <Navigate to="/auth" />;
    }

    return component;
}