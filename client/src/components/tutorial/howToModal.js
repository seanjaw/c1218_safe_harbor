import React, {Component, Fragment} from 'react';

class HowToModal extends Component {

    render(){
        return (
            <div>
                <div id="modal1" className="modalDisplay z-depth-4 black">
                    <span className="close" onClick={this.props.closeModal}>&times;</span>
                    <div className="modal-content">
                        <h4 className='center white-text'>How to video tutorial</h4>
                        <p className='center white-text'>This is a basic walk through of our application</p>

                        <div className="embedresize">
                            <div>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/hS6LLy4uN9U?autoplay=1&showinfo=0&controls=1&rel=0" frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer" onClick={this.props.closeModal}>
                        <button  className='btn waves-effect waves-light howToBtn'>Exit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default HowToModal;