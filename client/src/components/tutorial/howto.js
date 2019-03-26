import React, {Component, Fragment} from 'react';

class Howto extends Component {
    constructor(props) {
        super(props);
        console.log(props.props);
    }

    exitModal() {
        console.log('Exit');
        var target = document.getElementById('modal1');

        target.classList.remove('modalDisplay');
        target.classList.add('modal');
    }

    componentDidMount() {

    }

    render(){
        return (
            <div>
                {/*<a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>*/}

                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4 className='center'>How to video tutorial</h4>
                        <p className='center'>This is a basic walk through of our application</p>

                        <div className="embedresize">
                            <div>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/hS6LLy4uN9U?autoplay=1&showinfo=0&controls=1&rel=0" frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {/*<a href="#!" className="modal-close waves-effect waves-green btn-flat">Exit</a>*/}
                        <button onClick={this.exitModal} className='modal-close btn waves-effect waves-light howToBtn'>Exit</button>
                        {/*<button onClick={this.exitModal}>Exit</button>*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default Howto;