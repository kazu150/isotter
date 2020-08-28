import React from 'react';

const FormEdit = props => {
    return(
        <div className="field">
            <label>{props.title}</label>
            <input 
                type="text" 
                name={props.name || 'default'} 
                value={props.value}
                onChange={props.onChange} 
                placeholder={props.placeholder || 'default'} 
            />
        </div>
    )
}

export default FormEdit;