import React from 'react';

class Preloader extends React.Component {
    render() {        
        return (
            <div id="preloader">
                <div data-loader="dual-ring"></div>
            </div>
        );
    }
}

export default Preloader