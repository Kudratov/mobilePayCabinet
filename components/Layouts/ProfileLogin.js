import React from 'react';
import Login from './../Login/Login';
import Welcome from './../Login/Welcome';

// import './../../assets/vendor/font-awesome/css/all.min.css';
// import './../../assets/sass/stylesheet.scss';

class ProfileLogin extends React.Component {
    render() {        
        return (
            <div id="main-wrapper" className="h-100">
                <div className="container-fluid px-0 h-100-class">
                    <div className="row no-gutters h-100">
                        <Welcome />
                        <Login />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileLogin