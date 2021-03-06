import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Default from '../helpers/default';

class Modal extends React.Component {
    constructor() {
        super();
        this.closeModal.bind();
        this.makeModal.bind();
    }
    componentDidMount(){
        document.addEventListener('keyup', function(e){
            if (e.keyCode === 27) this.props.closeModal();
        }.bind(this));
    }
    componentWillUnmount(){
        document.addEventListener('keydown', function(e){
            if (e.keyCode === 27) this.props.closeModal();
        }.bind(this));
    }
    closeModal() {
        this.props.closeModal(false);
    }
    makeModal() {
        if(this.props.isModal){
            return;
        }
        this.closeModal();
    }
    render() {
        return (
            <div>
            {this.props.open &&        
                <div className="reveal-overlay" style={Object.assign({}, this.props.overlayStyle, Default.overlayRequiredStyle)} onClick={() => this.makeModal()}>
                    <div className={`${this.props.size} reveal`} style={Object.assign({}, this.props.revealStyle, Default.revealRequiredStyle)} >
                        {!this.props.hideCloseButton && 
                            <button className="close-button" style={this.props.closeStyle} type="button" onClick={() => this.closeModal()} >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        }
                        {this.props.children}
                    </div>
                </div>
            }
            </div>
        );
    }
}
Modal.defaultProps = {
    open: false,
    isModal: false,
    hideCloseButton: false,
    size: 'small',
    overlayStyle: {},
    revealStyle: {},
    closeStyle: {}
}
Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    isModal: PropTypes.bool,
    hideCloseButton: PropTypes.bool,
    size: PropTypes.string,
    closeModal: PropTypes.func,
    overlayStyle: PropTypes.shape({}),
    revealStyle: PropTypes.shape({}),
    closeStyle: PropTypes.shape({})
  };
export default Modal;
