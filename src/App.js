import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import './App.css';

function App() {
    const [user, setUser] = useState({});

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;

    }

    function handleSignOut(event) {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: "341650478730-9r92nmdm64f6rsdlr65b43s400eggfkj.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }

        )
    }, []);

    return (
        <div className="App">
            <div id='signInDiv'></div>
            {
                Object.keys(user).length !== 0 &&
                <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            }
            {
                Object.keys(user).length > 0 &&
                <p>asdasd</p>
            }
            {user &&
                <div>
                    <img src={user.picture} alt=""></img>
                    <h3>{user.name}</h3>

                </div>
            }
        </div>
    );
}

export default App;
