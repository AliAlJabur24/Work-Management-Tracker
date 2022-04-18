import React from 'react';

function UserProfile(props) {
    const data = Object.entries(props.data);
    console.log(data);
    return(
<div className="uk-position-top-left  uk-card uk-card-default uk-width-1-5">
    <div className="uk-card-header">
        <div className="uk-grid-small uk-flex-middle" uk-grid>
            <div className="uk-width-auto">
                <img className="uk-border-circle" width="40" height="40" src={data[1][1]}></img>
            </div>
            <div className="uk-width-expand">
                <h3 className="uk-card-title uk-margin-remove-bottom">{data[3][1]}</h3>
                <p className="uk-text-meta uk-margin-remove-top">{data[2][1]} </p>
            </div>
        </div>
    </div>
</div>


    );
}

export default UserProfile;
