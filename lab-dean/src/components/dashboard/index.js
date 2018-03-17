import React from 'react';
import {connect} from 'react-redux';
import {categoryCreate, categoryDelete} from '../../actions/category-actions';
import CategoryForm from '../category/category-form/index';
import CategoryItem from '../category/category-item/index';
import ExpenseItem from '../expense/expense-item/index';

class Dashboard extends React.Component {
  render() {
    return (
      <section>
        <h1>Track Your Spending Problems!</h1>
        <CategoryForm
          buttonText="Create"
          onComplete={this.props.dashboardCategoryCreate}/>

        {this.props.categories ?
          this.props.categories.map(category =>
            <div key={category._id}>
              <CategoryItem
                category={category}
                buttonText="Delete"/>

            </div>)
          :
          undefined
        }

      </section>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  expenses: state.expenses,
});

const mapDispatchToProps = (dispatch, getState) => ({
  dashboardCategoryCreate: category => dispatch(categoryCreate(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);