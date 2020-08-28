import React from 'react';
import history from '../history';

class PostEdit extends React.Component {
    state={ post: '' }; 
    
    onSubmitButtonClick = () => {
        this.props.onPostSubmit(this.state.post);
        history.push('/');
    }

    render(){
        return(
            <div className='ui form'>
                <div className="ui medium header">Write a post</div>
                <div className='field'>
                    <label>Text</label>
                    <textarea 
                        value={this.state.post}
                        onChange={ (e) => this.setState({post: e.target.value})}
                    >
                    </textarea>
                </div>
                <div 
                    className='ui submit button'
                    onClick={this.onSubmitButtonClick}
                >
                    Submit
                </div>
            </div>
        );
    };
}

export default PostEdit;