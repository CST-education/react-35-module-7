import { Component } from 'react';

export class SearchFrom extends Component {
  state = {
    searchValue: '',
    perPage: 5,
  };
  handleSearchChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSearchSubmit = e => {
    e.preventDefault();
    console.log('BEFORE FETCH', this.state.searchValue, this.state.perPage);
    // this.setState({ searchValue: '' });
    this.props.getSearchValues(this.state.searchValue, this.state.perPage);
    this.setState({ searchValue: '', perPage: 5 });
  };
  render() {
    return (
      <form onSubmit={this.handleSearchSubmit}>
        <input
          type="text"
          name="searchValue"
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
          placeholder="Value"
        />
        <input
          type="number"
          name="perPage"
          value={this.state.perPage}
          onChange={this.handleSearchChange}
          placeholder="how many results?"
        />
        <button type="submit">search</button>
      </form>
    );
  }
}
