import React from 'react';
import {connect} from 'react-redux';
import {categoryCreate} from '../../actions/category-actions';
import CategoryItem from '../category/category-item/category-item';
import CategoryForm from '../../components/category/category-form/category-form';
import category from '../../reducers/category';
import index from '../category/category-item/category-item';

class Dashboard extends React.Component {
  render() {
    let totalSpend = this.props.categories.reduce((a, b) => a + parseInt(b.value), 0);

    return (
      <section>
        <h1>Track Your Spending Problems!</h1>
        <h3 className="total">Total Spend: ${totalSpend}</h3>
        <CategoryForm
          buttonText='Create'
          onComplete={this.props.dashboardCategoryCreate}/>

        {this.props.categories ?
          this.props.categories.map(category => 
            <div key={category._id}>
              <CategoryItem category={category}/>
            </div>)
          :
          undefined
        }

      </section>
    );
  }
}

const mapStateToProps = state => ({
  categories: state,
});

const mapDispatchToProps = (dispatch, getState) => ({
  dashboardCategoryCreate: category => dispatch(categoryCreate(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);