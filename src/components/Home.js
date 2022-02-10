import {useEffect, useState} from "react";
import axios from "axios";
import {Navigate,Link} from "react-router-dom";

export const Home = () => {
    const [name, setName] = useState('');
    const [navigate, setNavigate] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('user',{withCredentials: true});
                    console.log(data)
                setName(data.name);
            } catch (e) {
                setNavigate(true);
            }
        })();
    }, []);

    const logout = async () => {
        await axios.post('logout', {}, {withCredentials: true});

        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/login"/>;
    }

    return <div className="form-signin mt-5 text-center">
        <h3>Hi {name}</h3>

        <Link to="#" className="btn btn-lg btn-primary"
           onClick={logout}
        >Logout</Link>
    </div>
}
