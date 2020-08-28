import React from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './Header';
import Timeline from './Timeline';
import PostEdit from './PostEdit';
import Profile from './Profile';
import LogIn from './LogIn';
import SignUp from './SignUp';
import history from '../history';

class App extends React.Component {
    state = { 
        posts: [],
        post: {},
        isAuth: false,
        currentUser: {},
        selectedUser: '',
        err: ''
    };

    componentDidMount(){
        this.renderPosts();
    }

    renderPosts = () => {
        fetch('http://localhost:8080/timeline/posts',{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            // 昇順降順の調整（https://qiita.com/PianoScoreJP/items/f0ff7345229871039672）
            const posts = resData.posts.sort(function(a,b){
                if(a._id>b._id) return -1;
                if(a._id < b._id) return 1;
                return 0;
            });
            this.setState({posts: posts})
        })
        .catch(err => console.log(err))
    }

    onLogoutClick = () => {
        this.setState({
            isAuth: false,
            currentUser: {}
        })
    }

    onPostSubmit = post => {
        const method = 'POST';

        fetch('http://localhost:8080/timeline/post', {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.state.currentUser._id,
                content: post,
                
            })
        })
        .then(res => {
            return res.json()
        })
        .then(resData => {
            this.setState({ posts: [ resData.post, ...this.state.posts ] })
        })
        .catch(err => console.log(err))
    }

    onDeleteClick = postId => {
        const method = 'DELETE';

        fetch('http://localhost:8080/timeline/post',{
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: postId
            })
        })
        .then(res => {
            return res.json()
        })
        .then(resData => {
            let posts = this.state.posts;
            posts = posts.filter((obj) => {
                return obj._id !== resData.deletedPost._id;
            });
            this.setState({
                posts: posts
            });
        })
    }

    onClickAuthorName = userName => {
        this.setState({
            selectedUser: userName
        })
        history.push(`/profile/${userName}`);
    }
    
    onProfileButtonClick = () => {
        this.setState({
            selectedUser: this.state.currentUser.userName
        })
    }

    onLoginSubmit = userName => {
        this.setState({
            currentUser: userName,
            isAuth: true
        })
    }

    addNewUser = userName => {
        const method = 'PUT';

        fetch('http://localhost:8080/admin/signup', {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                thumb: 'https://s3.amazonaws.com/uifaces/faces/twitter/switmer777/128.jpg'
            })
        })
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err))
    }

    updateUser = user => {
        this.setState({
            selectedUser: user
        });
        this.renderPosts();
    }

    render(){
        return (
            <div className='ui container'>
                <Router history={history}>
                    <Header 
                        isAuth={this.state.isAuth} 
                        onLogoutClick={this.onLogoutClick} 
                        onProfileButtonClick={this.onProfileButtonClick}
                        userName={this.state.currentUser.userName}
                    />
                    <div>
                        <Route path='/' 
                            exact 
                            render={ props => 
                                <Timeline 
                                    posts={this.state.posts} 
                                    onDeleteClick={this.onDeleteClick}
                                    onClickAuthorName={this.onClickAuthorName}
                                    {...props} 
                                /> 
                            }
                        />
                        <Route path='/post' 
                            render={ props => <PostEdit onPostSubmit={this.onPostSubmit} {...props} /> }
                        />
                        <Route path='/login'
                            render={ props => 
                                <LogIn
                                    onLoginSubmit={this.onLoginSubmit} 
                                    {...props} 
                                /> 
                            } 
                        />
                        <Route path='/signup' 
                            render={ props => 
                                <SignUp 
                                    addNewUser={this.addNewUser}
                                    {...props}
                                />
                            }
                        />
                        <Route path='/profile/:userName'
                            render={ props => 
                                <Profile 
                                    selectedUser={this.state.selectedUser}
                                    updateUser={this.updateUser}
                                    {...props}
                                />
                            } 
                        />
                        {/* 
                            ↑ 「React Router v4 でルーティング先の component に Props を渡す方法」参照
                            https://ngzm.hateblo.jp/entry/2017/06/23/001352 
                        */}
                        {this.state.err}
                    </div>
                </Router>
            </div>
        );
    }
};

export default App;