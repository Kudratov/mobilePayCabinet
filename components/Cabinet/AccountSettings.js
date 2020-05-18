import React from 'react';

class AccountSettings extends React.Component {
    render() {        
        return (
            <div>
                <div>
                    <div className="bg-light shadow-sm rounded p-4 mb-4">
                        <h3 className="text-5 font-weight-400 mb-3">Account Settings <a href="#edit-account-settings" data-toggle="modal" className="float-right text-1 text-uppercase text-muted btn-link"><i className="fas fa-edit mr-1" />Edit</a></h3>
                        <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">Language</p>
                        <p className="col-sm-9">English (United States)</p>
                        </div>
                        <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">Time Zone</p>
                        <p className="col-sm-9">(GMT-06:00) Central America</p>
                        </div>
                        <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">Account Status</p>
                        <p className="col-sm-9"><span className="bg-success text-white rounded-pill d-inline-block px-2 mb-0"><i className="fas fa-check-circle" /> Active</span></p>
                        </div>
                    </div>
                    {/* Edit Details Modal
                        ================================== */}
                    <div id="edit-account-settings" className="modal fade " role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title font-weight-400">Account Settings</h5>
                            <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                            </div>
                            <div className="modal-body p-4">
                            <form id="accountSettings" method="post">
                                <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                    <label htmlFor="language">Language</label>
                                    <select className="custom-select" id="language" name="language_id">
                                        <option value={1}>English (United States)</option>
                                        <option value={2}>Spanish </option>
                                        <option value={3}>Chinese</option>
                                        <option value={4}>Russian</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                    <label htmlFor="input-timezone">Time Zone</label>
                                    <select className="custom-select" id="input-timezone" name="timezone_id">
                                        <option value={-12}>(GMT-12:00) International Date Line West</option>
                                        <option value={-11}>(GMT-11:00) Midway Island, Samoa</option>
                                        <option value={-10}>(GMT-10:00) Hawaii</option>
                                        <option value={-9}>(GMT-09:00) Alaska</option>
                                        <option value={-8}>(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                                        <option value={-8}>(GMT-08:00) Tijuana, Baja California</option>
                                        <option value={-7}>(GMT-07:00) Arizona</option>
                                        <option value={-7}>(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                                        <option value={-7}>(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                                        <option selected="selected" value={-6}>(GMT-06:00) Central America</option>
                                        <option value={-6}>(GMT-06:00) Central Time (US &amp; Canada)</option>
                                        <option value={-6}>(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                                        <option value={-6}>(GMT-06:00) Saskatchewan</option>
                                        <option value={-5}>(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                                        <option value={-5}>(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                                        <option value={-5}>(GMT-05:00) Indiana (East)</option>
                                        <option value={-4}>(GMT-04:00) Atlantic Time (Canada)</option>
                                        <option value={-4}>(GMT-04:00) Caracas, La Paz</option>
                                        <option value={-4}>(GMT-04:00) Manaus</option>
                                        <option value={-4}>(GMT-04:00) Santiago</option>
                                        <option value="-3.5">(GMT-03:30) Newfoundland</option>
                                        <option value={-3}>(GMT-03:00) Brasilia</option>
                                        <option value={-3}>(GMT-03:00) Buenos Aires, Georgetown</option>
                                        <option value={-3}>(GMT-03:00) Greenland</option>
                                        <option value={-3}>(GMT-03:00) Montevideo</option>
                                        <option value={-2}>(GMT-02:00) Mid-Atlantic</option>
                                        <option value={-1}>(GMT-01:00) Cape Verde Is.</option>
                                        <option value={-1}>(GMT-01:00) Azores</option>
                                        <option value={0}>(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
                                        <option value={0}>(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                                        <option value={1}>(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                                        <option value={1}>(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                                        <option value={1}>(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                                        <option value={1}>(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                                        <option value={1}>(GMT+01:00) West Central Africa</option>
                                        <option value={2}>(GMT+02:00) Amman</option>
                                        <option value={2}>(GMT+02:00) Athens, Bucharest, Istanbul</option>
                                        <option value={2}>(GMT+02:00) Beirut</option>
                                        <option value={2}>(GMT+02:00) Cairo</option>
                                        <option value={2}>(GMT+02:00) Harare, Pretoria</option>
                                        <option value={2}>(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                                        <option value={2}>(GMT+02:00) Jerusalem</option>
                                        <option value={2}>(GMT+02:00) Minsk</option>
                                        <option value={2}>(GMT+02:00) Windhoek</option>
                                        <option value={3}>(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
                                        <option value={3}>(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                                        <option value={3}>(GMT+03:00) Nairobi</option>
                                        <option value={3}>(GMT+03:00) Tbilisi</option>
                                        <option value="3.5">(GMT+03:30) Tehran</option>
                                        <option value={4}>(GMT+04:00) Abu Dhabi, Muscat</option>
                                        <option value={4}>(GMT+04:00) Baku</option>
                                        <option value={4}>(GMT+04:00) Yerevan</option>
                                        <option value="4.5">(GMT+04:30) Kabul</option>
                                        <option value={5}>(GMT+05:00) Yekaterinburg</option>
                                        <option value={5}>(GMT+05:00) Islamabad, Karachi, Tashkent</option>
                                        <option value="5.5">(GMT+05:30) Sri Jayawardenapura</option>
                                        <option value="5.5">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                                        <option value="5.75">(GMT+05:45) Kathmandu</option>
                                        <option value={6}>(GMT+06:00) Almaty, Novosibirsk</option>
                                        <option value={6}>(GMT+06:00) Astana, Dhaka</option>
                                        <option value="6.5">(GMT+06:30) Yangon (Rangoon)</option>
                                        <option value={7}>(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                                        <option value={7}>(GMT+07:00) Krasnoyarsk</option>
                                        <option value={8}>(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                                        <option value={8}>(GMT+08:00) Kuala Lumpur, Singapore</option>
                                        <option value={8}>(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                                        <option value={8}>(GMT+08:00) Perth</option>
                                        <option value={8}>(GMT+08:00) Taipei</option>
                                        <option value={9}>(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                                        <option value={9}>(GMT+09:00) Seoul</option>
                                        <option value={9}>(GMT+09:00) Yakutsk</option>
                                        <option value="9.5">(GMT+09:30) Adelaide</option>
                                        <option value="9.5">(GMT+09:30) Darwin</option>
                                        <option value={10}>(GMT+10:00) Brisbane</option>
                                        <option value={10}>(GMT+10:00) Canberra, Melbourne, Sydney</option>
                                        <option value={10}>(GMT+10:00) Hobart</option>
                                        <option value={10}>(GMT+10:00) Guam, Port Moresby</option>
                                        <option value={10}>(GMT+10:00) Vladivostok</option>
                                        <option value={11}>(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
                                        <option value={12}>(GMT+12:00) Auckland, Wellington</option>
                                        <option value={12}>(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                                        <option value={13}>(GMT+13:00) Nuku'alofa</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                    <label htmlFor="accountStatus">Account Status</label>
                                    <select className="custom-select" id="accountStatus" name="language_id">
                                        <option value={1}>Active</option>
                                        <option value={2}>In Active</option>
                                    </select>
                                    </div>
                                </div>
                                </div>
                                <button className="btn btn-primary btn-block mt-2" type="submit">Save Changes</button>
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

export default AccountSettings