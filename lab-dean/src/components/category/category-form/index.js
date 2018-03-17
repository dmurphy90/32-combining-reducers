import React from 'react';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.category ?
      this.props.category :
      {
        name: '',
        budget: 0,
        editing: false,
      };

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
      name: '',
      budget: 0,
      editing: false,
    });
  }

  render() {
    return (
      <form className="category-form" onSubmit={this.handleSubmit}>
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
            name="budget"
            value={this.state.budget}
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

export default CategoryForm;