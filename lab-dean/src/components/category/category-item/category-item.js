import React from 'react';
import {connect} from 'react-redux';
import { renderIf } from '../../../lib/utils';
import category from '../../../reducers/category';
import CategoryForm from '../category-form/category-form';
import {categoryDelete, categoryUpdate} from '../../../actions/category-actions';
import ExpenseItem from '../../expense/expense-item';
import ExpenseForm from '../../expense/expense-form/expense-form';
import expense from '../../../reducers/expense';
import {expenseCreate} from '../../../actions/expense-actions';


class CategoryItem extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.category ?
      this.props.category :
      {
        title: '',
        value: 0,
        updating: false,
      };

    let memberFunctions = Object.getOwnPropertyNames(CategoryItem.prototype);
    for(let functionName of memberFunctions){
      if(functionName.startsWith('handle')){
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleDelete() {
    this.props.CategoryDelete(this.props.category);
  }

  handleUpdate(category) {
    this.props.CategoryUpdate(category);
    this.setState({updating: false});
  }

  render(){
    let totalSpend = this.props.expenses[this.props.category._id].reduce((a, b) => a + parseInt(b.value), 0);

    return(
      <section className={this.state.updating === true ? 'items' : 'normal'} onDoubleClick={() => this.setState({updating: !this.state.updating})}>

        <h2>Item: {this.props.category.title}</h2>
        <h6>Date: {this.props.category.timestamp.toString()}</h6>
        <p>Amount: ${this.props.category.value - totalSpend}</p>
        <button
          className='delete_button'
          type='button'
          value={this.props.category._id}
          onClick={this.handleDelete}
        >x</button>

        {renderIf(this.state.updating === false,
          <ExpenseForm
            categoryId={this.props.category._id}
            buttonText='create expense'
            onComplete={this.props.ExpenseCreate} />
        )}

        {renderIf(this.state.updating === true,
          <CategoryForm 
            category={this.props.category}
            buttonText='update'
            onComplete={this.handleUpdate} />
        )}

        {this.props.expenses[this.props.category._id] ?
          this.props.expenses[this.props.category._id].map(expense => 
            <div key={expense._id}>
              <ExpenseItem expense={expense}/>
            </div>)
          :
          undefined
        }

      </section>
    );
  }
}

const mapStateToProps = state => ({
  expenses: state.expenses,
});

const mapDispatchToProps = (dispatch, getState) => ({
  CategoryDelete: category => dispatch(categoryDelete(category)),
  CategoryUpdate: category => dispatch(categoryUpdate(category)),

  ExpenseCreate: expense => dispatch(expenseCreate(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);