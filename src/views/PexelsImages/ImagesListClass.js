import { Component } from 'react';
import { PexelsFetchObject } from '../../services/pexels';
const base_url = `https://api.pexels.com/v1/`;
const api_key = `563492ad6f91700001000001390f9fee0a794c1182a72e49e0e0eae2`;
// const zhenya_key = `563492ad6f917000010000018ad09ac3acee45ebbb46a78f456e8ffa`;
const newPexelsFetchObject = new PexelsFetchObject(base_url, api_key);
// console.log(newPexelsFetchObject);

export class ImagesList extends Component {
  state = {
    searchResults: [],
    status: 'init',
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchValue !== this.props.searchValue ||
      prevProps.perPage !== this.props.perPage
    ) {
      console.log(`get fetch`);
      this.setState({ status: 'pending' });
      newPexelsFetchObject.resetPage();
      newPexelsFetchObject.searchQuery = this.props.searchValue;
      newPexelsFetchObject.perPage = this.props.perPage;
      newPexelsFetchObject
        .searchPhotos()
        .then(searchResults => {
          console.log(searchResults);
          this.setState({ searchResults, status: 'success' });
        })
        .catch(err => {
          console.log(err);
          this.setState({ status: 'error' });
        });
    }
  }
  handleClick = () => {
    newPexelsFetchObject.page = 1;
    console.log(newPexelsFetchObject.page);
    newPexelsFetchObject
      .searchPhotos()
      .then(searchResults => {
        console.log(searchResults);
        this.setState(prev => ({
          searchResults: [...prev.searchResults, ...searchResults],
          status: 'success',
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState({ status: 'error' });
      });
  };
  render() {
    if (this.state.status === 'init') {
      return <h1>Hello! Search something</h1>;
    }
    if (this.state.status === 'pending') {
      return <h1>Wait please!</h1>;
    }
    if (this.state.status === 'success') {
      return (
        <>
          <ul>
            {this.state.searchResults.map(el => (
              <li key={el.id}>
                <img src={el.src.tiny} alt={el.photographer} />
              </li>
            ))}
          </ul>
          <button type="button" onClick={this.handleClick}>
            load more
          </button>
        </>
      );
    }
    if (this.state.status === 'error') {
      return <h1>ALARMA!!!</h1>;
    }
  }
}
