import { Link, useNavigate } from "react-router-dom";
import {Helmet} from 'react-helmet';

import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Error page"
                />
                <title>Page not found</title>
            </Helmet>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>
                Page doesn't exist.
            </p>
            <a href="#" onClick={() => navigate(-1)} style={{'textAlign': 'center', 'display': 'block', 'fontSize': '24px', 'marginTop': '30px'}}>
                Go back
            </a>
            <Link to='/marvel-app' style={{'textAlign': 'center', 'display': 'block', 'fontSize': '24px', 'marginTop': '30px'}}>
                Go back to main page
            </Link>
        </div>
    );
}

export default Page404;