import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap/lib';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Create } from '../../components';
import { update, create } from '../../redux/modules/admin';

@connect(() => { }, { update, create })
export default class Update extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.o,
    formData: PropTypes.o,
    update: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired
  };

  static defaultProps = {
    data: {},
    formData: {}
  };

  handleSubmit = async formData => {
    console.log('update', formData);
    const { data } = this.props;
    this.props[data.operation](data.api, formData);
  }

  render() {
    const {
      showModal,
      data,
      formData
    } = this.props;
    return (
      <Modal show={showModal} onHide={this.props.closeModal}>
        <Modal.Header>
          <Modal.Title>{data.operation}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Create
            onSubmit={this.handleSubmit}
            formData={data.form}
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
