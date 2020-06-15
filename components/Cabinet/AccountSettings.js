import React from 'react';
import {connect} from 'react-redux';

import {changeLanguage} from './../../store/actions/cartActions';
import Languages from './../../store/languages.json';

class AccountSettings extends React.Component {
    constructor(props){
        super(props)
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    handleLanguageChange (e) {
        let __lan = e.target.value;
        this.props.dispatch(changeLanguage(__lan));
    }

    render() {        
        return (
            <div>
                <div>
                    <div className="bg-light shadow-sm rounded p-4 mb-4">
                        <h3 className="text-5 font-weight-400 mb-3">{Languages.page.cabinet_settings[this.props.language].t4} <a href="#edit-account-settings" data-toggle="modal" className="float-right text-1 text-uppercase text-muted btn-link"><i className="fas fa-edit mr-1" />Edit</a></h3>
                        <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">{Languages.page.cabinet_settings[this.props.language].t5}</p>
                        {this.props.language === "Уз_уз" && <p className="col-sm-9">Ўзбекча</p>}
                        {this.props.language === "Uz_uz" && <p className="col-sm-9">O'zbekcha</p>}
                        {this.props.language === "Ru_ru" && <p className="col-sm-9">Русский</p>}
                        {this.props.language === "Eng_eng" && <p className="col-sm-9">English</p>}
                        </div>
                        <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">{Languages.page.cabinet_settings[this.props.language].t6}</p>
                        <p className="col-sm-9">(GMT+05:00) Tashkent, Uzbekistan</p>
                        </div>
                        <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">{Languages.page.cabinet_settings[this.props.language].t7}</p>
                        <p className="col-sm-9"><span className="bg-success text-white rounded-pill d-inline-block px-2 mb-0"><i className="fas fa-check-circle" /> Active</span></p>
                        </div>
                    </div>
                    {/* Edit Details Modal
                        ================================== */}
                    <div id="edit-account-settings" className="modal fade " role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title font-weight-400">{Languages.page.cabinet_settings[this.props.language].t4}</h5>
                            <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                            </div>
                            <div className="modal-body p-4">
                            <form id="accountSettings">
                                <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                    <label htmlFor="language">{Languages.page.cabinet_settings[this.props.language].t5}</label>
                                    <select onChange={e => this.handleLanguageChange(e)} className="custom-select" id="language" name="language_id">
                                        <option selected={this.props.language === "Уз_уз" ? true : false} value="Уз_уз">Ўзбекча</option>
                                        <option selected={this.props.language === "Uz_uz" ? true : false} value="Uz_uz">O'zbekcha</option>
                                        <option selected={this.props.language === "Ru_ru" ? true : false} value="Ru_ru">Русский</option>
                                        <option selected={this.props.language === "Eng_eng" ? true : false} value="Eng_eng">English</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                    <label htmlFor="input-timezone">{Languages.page.cabinet_settings[this.props.language].t6}</label>
                                    <select className="custom-select" id="input-timezone" name="timezone_id">
                                        <option value={+5}>(GMT+05:00) Tashkent, Uzbekistan</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                    <label htmlFor="accountStatus">{Languages.page.cabinet_settings[this.props.language].t7}</label>
                                    <select className="custom-select" id="accountStatus" name="language_id">
                                        <option value={1}>Active</option>
                                        <option value={2}>In Active</option>
                                    </select>
                                    </div>
                                </div>
                                </div>
                                <a className="btn btn-primary btn-block mt-2 text-white card-add-f-btn" data-dismiss="modal" aria-label="Close">Save Changes</a>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        language: state.language
    }
}

export default connect(mapStateToProps)(AccountSettings)