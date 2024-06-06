import { useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import Login from "../../pages/Login";

const RequireAuth =  () => {
    const token = useSelector(selectCurrentToken);

    console.log("token: ", token);

    if (!token) {
        return <Login />;
    }

    return <Outlet />;
};

export default RequireAuth;


// export default RequireAuth;
