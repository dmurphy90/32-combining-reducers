import React from 'react';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.expense ?
      this.props.expense :
      {
        name: '',
        price: 0,
        categoryId: this.props.categoryId,
        editing: false,
      },

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(
      this.state
    );

    this.setState({
      name: '',
      price: 0,
      categoryId: this.props.categoryId,
      editing: false,
    });
  }

  render() {
    return (
      <form className="expense-form" onSubmit={this.handleSubmit}>
        <fieldset>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}/>
        </fieldset>
        <fieldset>
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}/>
        </fieldset>

        <button
          type="submit">
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}

export default ExpenseForm;