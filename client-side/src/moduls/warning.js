import React from 'react';

class Warning extends React.Component {
    state = {

    }


    render() {
        return <div className='col-md-8'>
            <div className={this.props.class?'alert alert-success':'alert alert-danger'}>
                <h4 className='text-center'>{this.props.message}</h4>
            </div>
        </div>
    }
}
export default Warning;