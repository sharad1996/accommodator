import React from 'react';
import { Table, Button } from 'antd';
import 'antd/dist/antd.css';

// const data = [
//   {
//     key: '1',
//     activatedPlans: 'Monthly plan',
//     subscriptionId: 32,
//     Leads: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     activatedPlans: 'Monthly plan',
//     subscriptionId: 42,
//     Leads: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     activatedPlans: 'Trial plan',
//     subscriptionId: 32,
//     Leads: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     activatedPlans: 'Trial plan',
//     subscriptionId: 32,
//     Leads: 'London No. 2 Lake Park',
//   },
// ];

class LeadsTable extends React.Component {
  // state = {
  //   filteredInfo: null,
  //   sortedInfo: null,
  // };

  // handleChange = (pagination, filters, sorter) => {
  //   this.setState({
  //     filteredInfo: filters,
  //     sortedInfo: sorter,
  //   });
  // };

  clearFilters = () => {
    this.props.handleChange( this.props.sortedInfo,null );
  };

  clearAll = () => {
    this.props.handleChange(null,null);
  };

  // setAgeSort = () => {
  //   this.setState({
  //     sortedInfo: {
  //       order: 'descend',
  //       columnKey: 'age',
  //     },
  //   });
  // };

  render() {
    const {columns,rows} = this.props;
    console.log(rows);
    // const {planReducer}= this.props;
    // let { sortedInfo, filteredInfo } = this.state;
    // sortedInfo = sortedInfo || {};
    // filteredInfo = filteredInfo || {};
    // const columns = [
    //   {
    //     title: 'Subscription Id',
    //     dataIndex: 'subscriptionId',
    //     key: 'asubscriptionIdge',
    //     sorter: (a, b) => a.subscriptionId - b.subscriptionId,
    //     sortOrder: sortedInfo.columnKey === 'subscriptionId' && sortedInfo.order,
    //     ellipsis: true,
    //   },
    //   {
    //     title: 'Activated Plans',
    //     dataIndex: 'activatedPlans',
    //     key: 'activatedPlans',
    //     filters: [
    //       { text: 'Monthly', value: 'Monthly' },
    //       { text: 'Yearly', value: 'Yearly' },
    //     ],
    //     filteredValue: filteredInfo.activatedPlans || null,
    //     onFilter: (value, record) => record.activatedPlans.includes(value),
    //     sorter: (a, b) => a.activatedPlans.length - b.activatedPlans.length,
    //     sortOrder: sortedInfo.columnKey === 'activatedPlans' && sortedInfo.order,
    //     ellipsis: true,
    //   },

    //   {
    //     title: 'Leads',
    //     dataIndex: 'Leads',
    //     key: 'Leads',
    //     filteredValue: filteredInfo.Leads || null,
    //     onFilter: (value, record) => record.Leads.includes(value),
    //     sorter: (a, b) => a.Leads.length - b.Leads.length,
    //     sortOrder: sortedInfo.columnKey === 'Leads' && sortedInfo.order,
    //     ellipsis: true,
    //   },
    // ];
    return (
      <div>
        <div className='table-operations'>
          <Button onClick={this.setAgeSort}>Sort Subscription Plans</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
        <Table columns={columns}  onChange={this.props.handleChange} dataSource={rows} />
      </div>
    );
  }
}

export default LeadsTable;
