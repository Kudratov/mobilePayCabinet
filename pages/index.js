import React from 'react';
import Router from 'next/router';

class HomeTwo extends React.Component {

    componentDidMount(){
        Router.push("/login")
    }

    render() {
        return (
            <React.Fragment>
                <h1>22</h1>
            </React.Fragment>
        );
    }
}

export default HomeTwo;
