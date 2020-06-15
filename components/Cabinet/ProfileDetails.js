import React from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';

import Languages from './../../store/languages.json';

class ProfileDetails extends React.Component {
    render() {        
        return (            
                <div className="bg-light shadow-sm rounded text-center p-3 mb-4">
                    <div className="profile-thumb mt-3 mb-4"> <img className="rounded-circle user-pic" src="./../../images/logo.png" alt="" />
                    <div className="profile-thumb-edit custom-file bg-primary text-white" data-toggle="tooltip" title="Change Profile Picture"> <i className="fas fa-camera position-absolute" />
                        <input type="file" className="custom-file-input" id="customFile" />
                    </div>
                    </div>
                    <p className="text-3 font-weight-500 mb-2">{Languages.page.cabinet_main[this.props.language].t29}</p>
                    <p className="mb-2"><Link href="/cabinet-settings"><a className="text-5 text-light" data-toggle="tooltip" title="Edit Profile"><i className="fas fa-edit" /></a></Link></p>
                </div>            
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        language: state.language
    }
}

export default connect(mapStateToProps)(ProfileDetails);