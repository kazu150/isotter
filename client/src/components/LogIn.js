import React from 'react';
import FormEdit from './FormEdit';
import history from '../history';

class LogIn extends React.Component {

    state = { userName: '', password: '', err: '' }

    onLoggingIn = (e) => {
        e.preventDefault();

        const method = 'POST'

        fetch('http://localhost:8080/admin/login', {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: this.state.userName
            })
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            console.log(resData)
            if( resData.user.length ){
                history.push('/');
                this.props.onLoginSubmit(resData.user[0]);
            } else {
                this.setState({ err: 'ユーザーがいません' });
            }
        })
        .catch( err => console.log(err) );
    }

    renderErrorMessage = () => {
        if(this.state.err){
            return(
                <div className="ui negative message">
                    <div className="header">
                        Error!!!
                    </div>
                    <p>{this.state.err}</p>
                </div>
            )
        }
    }


    render(){
        return (
            <form 
                className="ui form success"
                onSubmit={this.onLoggingIn}
            >
                <div className="ui medium header">Login</div>
                <FormEdit 
                    className="field" 
                    title="UserName" 
                    placeholder="test123" 
                    name="userName" 
                    value={this.state.userName} 
                    onChange={ e => this.setState({ userName: e.target.value })} 
                />
                <FormEdit 
                    className="field" 
                    title="Password" 
                    placeholder="test@test.com" 
                    name={this.state.password} 
                    onChange={ e => this.setState({ password: e.target.value })} 
                />
                {this.renderErrorMessage()}
                <button type="submit" className="ui submit button">
                    Submit
                </button>
            </form>
        );
    }
}

export default LogIn;