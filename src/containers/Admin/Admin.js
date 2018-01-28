import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { AdminTable, Update } from '../../components';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { operation: 'read', showModal: false };
  }

  componentWillMount() {
    this.setData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setData(nextProps);
  }

  setData = properties => {
    const { match } = properties;
    let data = {};
    if (match.params.id) {
      // eslint-disable-next-line import/no-dynamic-require
      data = require(`./properties/${match.params.id}.json`);
    }
    this.setState({
      data,
      operation: match.params.operation
    });
  };

  setOperation = operation => {
    this.setState({ operation });
  };

  close = () => {
    this.setState({
      showModal: false,
    });
  }

  renderEditModal = () => {
    const { showModal, data } = this.state;
    return (
      <Update
        // name={name}
        showModal={showModal}
        closeModal={this.close}
        data={data.create}
      />
    );
  };

  render() {
    console.log('DATA', this.state.data, this.state.operation);
    const { operation, data, showModal } = this.state;
    return [
      <Row style={{ marginTop: '60px' }}>
        <Col md={2} lg={2}>
          Sidebar
        </Col>
        <Col md={9} lg={9}>
          <Button onClick={() => this.setState({ showModal: true })}>
            Add
          </Button>
          <div>
            {operation === 'view' &&
              <AdminTable data={data && data.view && data} api={data && data.view && data.view.table.api} />
            }
          </div>
        </Col>
      </Row >,
      <div>{showModal && this.renderEditModal()}</div>
    ];
  }
}
