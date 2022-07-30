import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist.</p>
            <Link style={{'textAlign': 'center', 'display': 'block', 'fontSize': '24px', 'marginTop': '30px'}} to='/marvel-app'>Back to main page</Link>
        </div>
    );
}

export default Page404;