import React from 'react';
import FormEdit from './FormEdit';
import history from '../history';

class Profile extends React.Component {

    state = {
        user: {},
        pwConfirm: '',
        fruit: '',
        err: '',
        result: ''
    }

    getUser(){
        const method = 'GET';
        const userName = this.props.selectedUser

        fetch('http://localhost:8080/admin/userStatus/' + userName, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json()
        })
        .then(resData => {
            this.setState({
                user: {...resData.user[0]}
            })
        })
    }

    // 普通にstate内のuserオブジェクトにprops内のuserオブジェクトを代入すると、propsとstateが同じオブジェクトを参照しちゃうから、それを避ける
    componentDidMount = () => {
        // this.setState({
        //     user: {...this.props.selectedUser}
        // })
        // console.log(this.props.selectedUser);
        this.getUser();
    }


    onUpdateSubmit = (e) => {
        e.preventDefault();
        const method = 'PATCH';

        fetch('http://localhost:8080/admin/userStatus', {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.user
            })
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            this.setState({
                user: resData.user
            });
            this.props.updateUser(resData.user.userName);
            history.push(`/profile/${resData.user.userName}`);
        })

        // if(!this.state.user.userName){
        //     this.setState({ 
        //         err: 'Please enter your UserName',
        //         result: ''
        //     })
        // }else if(this.state.user.userName === this.props.user.userName){
        //     this.setState({ 
        //         err: 'Please Change your UserName!',
        //         result: ''
        //     })
        // }else if(this.props.userList.indexOf(this.state.user.userName) >= 0){
        //     this.setState({
        //         err: 'This UserName is already used!!',
        //         result: ''
        //     })
        // }else{
        //     this.props.updateUser(this.state.user.userName);
        //     this.setState({ 
        //         err: '',
        //         result: 'Your profile was successfully changed!' 
        //     })
        // }
    }

    renderErrorMessage = () => {
        if(this.state.err){
            return(
                <div className="ui negative message">
                    <div className="header">Error!!!</div>
                    <p>{this.state.err}</p>
                </div>
            );
        }
    }

    renderResultMessage = () => {
        if(this.state.result){
            return(
                <div className="ui success message">
                    <div className="header">Success!</div>
                    <p>{this.state.result}</p>
                </div>
            )
        }
    }

    onStatusChange = e => {
        const user = this.state.user;
        const targetKey = e.target.name;
        user[targetKey] = e.target.value;
        this.setState({
            user: {...user}
        })
    }

    render(){
        return (
            <form onSubmit={this.onUpdateSubmit} className='ui form success'>
                <div className="ui medium header">Profile of "{this.props.selectedUser}"</div>
                <FormEdit 
                    className="field" 
                    title="UserName" 
                    name="userName"
                    value={this.state.user.userName} 
                    onChange={this.onStatusChange}
                    placeholder="test123" 
                />
                <FormEdit 
                    className="field" 
                    title="E-mail" 
                    name="email"
                    value={this.state.user.email} 
                    onChange={this.onStatusChange}
                    placeholder="test@test.com" 
                />
                <FormEdit 
                    className="field" 
                    title="Thumbnail"
                    name="thumb"
                    value={this.state.user.thumb}
                    onChange={this.onStatusChange}
                    placeholder="test@test.com" 
                />
                <FormEdit 
                    className="field" 
                    title="Password" 
                    name="password"
                    value={this.state.user.password} 
                    onChange={this.onStatusChange}
                    placeholder="******" />
                <FormEdit 
                    className="field" 
                    title="Password Confirmation" 
                    name="passwordConfirm"
                    value={this.state.user.passwordConfirm} 
                    onChange={this.onStatusChange}
                    placeholder="******" />
                <FormEdit 
                    className="field" 
                    title="Favorite Fruit" 
                    name="fruit"
                    value={this.state.user.fruit} 
                    onChange={this.onStatusChange}
                    placeholder="Orange" />
                {this.renderErrorMessage()}
                {this.renderResultMessage()}
                <button type="submit" className='ui submit button'>Update</button>
                {console.log(this.state.user)}
                {console.log(this.props.user)}
            </form>
        );
    }
}

export default Profile;