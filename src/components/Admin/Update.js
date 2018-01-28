import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap/lib';
import PropTypes from 'prop-types';
import { Create } from '../../components';

export default class Update extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.o,
    formData: PropTypes.o
  };

  static defaultProps = {
    data: {},
    formData: {}
  };

  handleSubmit = () => {
    console.log('update');
  }

  render() {
    const {
      showModal,
      name,
      data,
      formData
    } = this.props;
    return (
      <Modal show={showModal} onHide={this.props.closeModal}>
        <Modal.Header>
          <Modal.Title>Edit {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Create
            jsonData={data}
            onSubmit={this.handleSubmit}
            formData={formData}
            initialValues={formData}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal} className="outline-btn">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
