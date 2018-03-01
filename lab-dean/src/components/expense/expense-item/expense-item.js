import React from 'react';
import {connect} from 'react-redux';
import { renderIf } from '../../../lib/untils';
import expense from '../../../reducers/expense';
import ExpenseForm from '../../expense/expense-form/expense-form';
import {expenseDelete, expenseUpdate} from '../../../actions/expense-actions';



class ExpenseItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      expense: this.props.expense ? 
        this.props.expense : 
        {
          title: '',
          value: 0,
          categoryId: this.props.categoryId,
        },
      updating: false,

    };

    let memberFunctions = Object.getOwnPropertyNames(ExpenseItem.prototype);
    for(let functionName of memberFunctions){
      if(functionName.startsWith('handle')){
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleDelete() {
    this.props.ExpenseDelete(this.props.expense);
  }

  handleUpdate(expense) {
    this.props.ExpenseUpdate(expense);
    this.setState({updating: false});
  }

  render(){
    return(
      <div className={this.state.updating === true ? 'expenses' : 'sub-item'} onDoubleClick={(e) => {
        e.stopPropagation();
        this.setState({updating: !this.state.updating});
      }
      }>

        <h2>Item: {this.props.expense.title}</h2>
        <p>Amount: ${this.props.expense.value}</p>
        <button
          className='delete_button'
          type='button'
          value={this.props.expense._id}
          onClick={this.handleDelete}
        >delete</button>

        {renderIf(this.state.updating === true,
          <ExpenseForm
            expense={this.props.expense}
            buttonText='Update'
            onComplete={this.handleUpdate} />
        )}

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, getState) => ({
  ExpenseDelete: expense => dispatch(expenseDelete(expense)),
  ExpenseUpdate: expense => dispatch(expenseUpdate(expense)),
});

export default connect(null, mapDispatchToProps)(ExpenseItem);