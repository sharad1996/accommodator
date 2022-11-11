import React from 'react';
import LeadsTable from '../common/table/leadsTable';
import _ from 'lodash';
import moment from 'moment';

class PlanDescription extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    rows:[]
  };
  componentDidMount () {
    this.rowData();
  }

  rowData = () =>{
    
    const {subscriptionReducer} = this.props;
    if (!_.has(subscriptionReducer,['responseData','data','subscriptionData']) || subscriptionReducer.responseData.data.subscriptionData.length <=0) {
      return [];

    }

    const returnData = subscriptionReducer.responseData.data.subscriptionData.map ((subData,index)=>{
      const data= {
        key:index,
        subscriptionId:subData.id,
        activatedPlans:subData.product_detail.product_plan.sub_plan,
        Leads: subData.product_detail.leads_count,
        PurchaseDate:moment(subData.product_detail.createdAt).format('YYYY-MM-DD'),
        ExpiryDate:subData.expiry_date !== null?moment(subData.expiry_date.createdAt).format('YYYY-MM-DD'):''
      }
      return data;
    })
    this.setState({rows:returnData})
  } 

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  

  render() {
    // this.rowData();
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Subscription Id',
        dataIndex: 'subscriptionId',
        key: 'subscriptionId',
        sorter: (a, b) => a.subscriptionId - b.subscriptionId,
        sortOrder: sortedInfo.columnKey === 'subscriptionId' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Activated Plans',
        dataIndex: 'activatedPlans',
        key: 'activatedPlans',
        filters: [
          { text: 'Monthly', value: 'Monthly' },
          { text: 'Yearly', value: 'Yearly' },
        ],
        filteredValue: filteredInfo.activatedPlans || null,
        onFilter: (value, record) => record.activatedPlans.includes(value),
        sorter: (a, b) => a.activatedPlans.length - b.activatedPlans.length,
        sortOrder: sortedInfo.columnKey === 'activatedPlans' && sortedInfo.order,
        ellipsis: true,
      },

      {
        title: 'Leads',
        dataIndex: 'Leads',
        key: 'Leads',
        filteredValue: filteredInfo.Leads || null,
        onFilter: (value, record) => record.Leads.includes(value),
        sorter: (a, b) => a.Leads.length - b.Leads.length,
        sortOrder: sortedInfo.columnKey === 'Leads' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Purchase Date',
        dataIndex: 'PurchaseDate',
        key: 'PurchaseDate',
        filteredValue: filteredInfo.PurchaseDate || null,
        onFilter: (value, record) => record.PurchaseDate.includes(value),
        sorter: (a, b) => a.PurchaseDate.length - b.PurchaseDate.length,
        sortOrder: sortedInfo.columnKey === 'PurchaseDate' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Expiry Date',
        dataIndex: 'ExpiryDate',
        key: 'ExpiryDate',
        filteredValue: filteredInfo.ExpiryDate || null,
        onFilter: (value, record) => record.ExpiryDate.includes(value),
        sorter: (a, b) => a.ExpiryDate.length - b.ExpiryDate.length,
        sortOrder: sortedInfo.columnKey === 'ExpiryDate' && sortedInfo.order,
        ellipsis: true,
      },
      
    ];
    return (
      <div>
        <LeadsTable columns={columns} rows={this.state.rows} handleChange={this.handleChange} sortedInfo={this.state.sortedInfo} />
      </div>
    );
  }
}
export default PlanDescription;
