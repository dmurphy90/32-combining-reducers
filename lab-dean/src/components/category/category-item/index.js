import React from 'react';
import {connect} from 'react-redux';
import {categoryUpdate, categoryDelete} from '../../../actions/category-actions';
import {expenseCreate} from '../../../actions/expense-actions';
import {renderIf} from '../../../lib/utils';
import CategoryForm from '../category-form/index';
import ExpenseForm from '../../expense/expense-form/index';
import ExpenseItem from '../../expense/expense-item/index';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.category ?
      this.props.category :
      {
        name: '',
        budget: 0,
        editing: false,
      };

    this.handleEditing = this.handleEditing.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEditing(category) {
    this.setState({
      editing: !this.state.editing,
    });
  }

  handleUpdate(category) {
    this.setState({
      editing: !this.state.editing,
    });
    this.props.categoryItemCategoryUpdate(category);
  }

  handleDelete() {
    this.props.categoryItemCategoryDelete(this.state);
  }

  render() {
    return (
      <div className="category-item" key={this.props.category._id} onDoubleClick={this.handleEditing}>
        <h3>{this.props.category.name}</h3>
        <p>Budget: ${this.props.category.budget}</p>
        <button type="button" onClick={this.handleDelete}>{this.props.buttonText}</button>
        {renderIf(this.state.editing, <CategoryForm
          category={this.props.category}
          buttonText="Update"
          onComplete={this.handleUpdate}/>)}

        <ExpenseForm
          categoryId={this.props.category._id}
          buttonText="Create Expense"
          onComplete={this.props.expenseItemExpenseCreate}
        />

        {this.props.expenses[this.props.category._id] ? this.props.expenses[this.props.category._id].map(expense =>
          <ExpenseItem key={expense._id} buttonText="Delete Expense" expense={expense} />
        )
          :
          undefined
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  expenses: state.expenses,
});

const mapDispatchToProps = (dispatch, getState) => ({
  categoryItemCategoryUpdate: category => dispatch(categoryUpdate(category)),
  categoryItemCategoryDelete: category => dispatch(categoryDelete(category)),
  expenseItemExpenseCreate: expense => dispatch(expenseCreate(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);