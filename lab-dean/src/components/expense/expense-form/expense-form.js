import React from 'react';
import { renderIf } from '../../../lib/utils';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.expense ?
      this.props.expense :
      {
        title: '',
        value: 0,
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
    this.props.onComplete(this.state);
    this.setState({
      title: '',
      value: 0,
      categoryId :this.props.categoryId,
    });
  }

  render() {
    return  (
      
      <form className="input-area" onSubmit={this.handleSubmit}>
        <input className="input"
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange}/>

        <input className="input"
          type="number"
          name="value"
          placeholder="Amount"
          value={this.state.value}
          onChange={this.handleChange}/>

        <button className="submit_btn" type="submit">{this.props.buttonText}</button>
      </form>
    );
  }
}

export default ExpenseForm;