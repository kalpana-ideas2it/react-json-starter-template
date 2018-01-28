import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { loadViewData } from '../../redux/modules/admin';
import { Update } from '../../components';

@connect(state => ({ admin: state.admin }), { loadViewData })
export default class AdminTable extends Component {
  static propTypes = {
    loadViewData: PropTypes.func.isRequired,
    api: PropTypes.string.isRequired,
    admin: PropTypes.o,
    data: PropTypes.o
  };

  static defaultProps = {
    admin: {},
    data: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      sizePerPage: 3,
      currentPage: 1,
      // page: 1,
      // searchTextVal: '',
      // sortName: 'id',
      // sortOrder: 'ASC',
      showModal: false,
      editData: {}
    };
  }

  componentWillMount() {
    console.log('will mount');
    const { api, data } = this.props;
    const filters = {
      filter: {
        limit: this.state.sizePerPage,
        offset: this.getOffset(1, this.state.sizePerPage)
      }
    };
    this.loadData(api, data.view.table.stateName, filters);
  }

  componentWillReceiveProps(nextProps) {
    console.log('will recieve proips');
    console.log(nextProps);
    const { api, data } = nextProps;
    const filters = {
      filter: {
        limit: this.state.sizePerPage,
        offset: this.getOffset(this.state.currentPage, this.state.sizePerPage)
      }
    };
    if (this.props.api !== api) {
      this.loadData(api, data.view.table.stateName, filters);
    }
  }

  // onSortChange = (sortNameVal, sortOrderVal) => {
  //   console.log('onSOrt change', sortOrderVal);
  // }

  onPageChange = (page, sizePerPage) => {
    // console.log('onPageChange', sizePerPage);
    console.log('page', page, 'sizePerPage', sizePerPage);
    const { api, data } = this.props;
    this.setState({
      currentPage: page
    }, () => {
      const filters = {
        filter: {
          limit: this.state.sizePerPage,
          offset: this.getOffset(page, this.state.sizePerPage)
        }
      };
      this.loadData(api, data.view.table.stateName, filters);
    });
  }

  onSizePerPageList = sizePerPage => {
    console.log('onSizePerPageList', sizePerPage);
    console.log('sizePerPage', sizePerPage);
    const { api, data } = this.props;
    this.setState({ sizePerPage }, () => {
      const filters = {
        filter: {
          limit: this.state.sizePerPage,
          offset: this.getOffset(this.state.currentPage, this.state.sizePerPage)
        }
      };
      this.loadData(api, data.view.table.stateName, filters);
    });
  }

  // handleSearch = searchText => {
  //   console.log('handleSearch', searchText);
  // }

  getOffset = (page, sizePerPage) => ((page - 1) * sizePerPage)

  loadData = (api, stateName, filters) => {
    console.log('loading data');
    this.props.loadViewData(api, stateName, filters);
  }

  formatter = (cell, row, c, index, type) => {
    if (type === 'actions') {
      return (
        <div>
          <i
            id={index}
            className="fa fa-pencil m-r-10 positive"
            role="button"
            onKeyPress={() => { }}
            onClick={() => this.setState({ showModal: true, editData: row })}
            tabIndex="0"
            style={{ color: 'green', marginRight: '5px' }}
          />
          <i
            className="fa fa-minus-circle negative"
            role="button"
            id={index}
            onKeyPress={() => { }}
            onClick={() => { }}
            tabIndex="0"
            style={{ color: 'red', marginLeft: '5px' }}
          />
        </div>
      );
    }
    return cell;
  };

  close = () => {
    this.setState({
      showModal: false,
      editData: {}
    });
  }

  renderEditModal = () => {
    const { showModal, editData } = this.state;
    const { data } = this.props;
    return (
      <Update
        // name={name}
        showModal={showModal}
        closeModal={this.close}
        data={data.update}
        formData={editData}
      />
    );
  };

  render() {
    const { data, admin } = this.props;
    const { showModal } = this.state;
    const options = {
      sizePerPage: this.state.sizePerPage,
      sizePerPageList: [
        {
          text: '5',
          value: 5
        },
        {
          text: '10',
          value: 10
        }
      ], // you can change the dropdown list for size per page
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3, // the pagination bar size.
      onSortChange: this.onSortChange,
      onPageChange: this.onPageChange,
      onSearchChange: this.handleSearch,
      onSizePerPageList: this.onSizePerPageList,
      page: this.state.currentPage,
    };
    return [
      <div>
        {data.view.table &&
          data.view.table.tableFormat &&
          data.view.table.tableFormat.length && (
            <BootstrapTable
              striped
              data={[{
                id: 12, firstName: 'firstname', lastName: 'lastname', username: 'username', email: 'email'
              }]}
              hover
              condensed
              maxHeight="400"
              pagination
              options={options}
              remote
              fetchInfo={{ dataTotalSize: 20 }}
            >
              {data.view.table.tableFormat.map(format => (
                <TableHeaderColumn
                  dataField={format.dataField}
                  isKey={format.isKey}
                  dataFormat={(cell, row, c, index) => this.formatter(cell, row, c, index, format.name)}
                  dataAlign="center"
                >
                  {format.name}
                </TableHeaderColumn>
              ))}
            </BootstrapTable>
          )}
      </div>,
      <div>{showModal && this.renderEditModal()}</div>
    ];
  }
}

{/* data={admin[data.view.table.stateName]} */ }