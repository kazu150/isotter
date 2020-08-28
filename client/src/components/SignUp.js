import React from 'react';
import history from '../history';
import FormEdit from './FormEdit'

class SignUp extends React.Component {

    state = {
        email: '',
        userName: '',
        pw: '',
        pwConfirm: '',
        err: ''
    }

    onSignupSubmit = e => {
        e.preventDefault();
        if(!this.state.userName){
            this.setState({err: 'Please enter your UserName'})
        // } else if(this.props.userList.indexOf(this.state.userId) >= 0) {
        //     this.setState({err: 'This UserID is already used'})
        } else {
            this.props.addNewUser(this.state.userName);
            history.push('/login');
        }
    }

    renderErrorMessage = () => {
        if(this.state.err){
            return (
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
        return(
            <form onSubmit={this.onSignupSubmit} className='ui form success'>
                <div className="ui medium header">SignUp</div>
                <FormEdit 
                    className="field" 
                    title="UserName  *required" 
                    placeholder="test123" 
                    value={this.state.userName} 
                    onChange={e => this.setState({ userName: e.target.value }) } 
                />
                <FormEdit 
                    className='field' 
                    title="E-mail" 
                    placeholder='test@test.com' 
                    value={this.state.email} 
                    onChange={e => this.setState({ email: e.target.value }) } 
                />
                <FormEdit 
                    className="field" 
                    title="Password" 
                    placeholder="*******" 
                    value={this.state.pw} 
                    onChange={e => this.setState({ pw: e.target.value }) } 
                />
                <FormEdit 
                    className="field" 
                    title="Password Confirmation" 
                    placeholder="*******" 
                    value={this.state.pwConfirm} 
                    onChange={e => this.setState({ pwConfirm: e.target.value }) } 
                />
                {this.renderErrorMessage()}
                <button className='ui submit button' type="submit">Submit</button>
            </form>
        )
    }
}

export default SignUp;