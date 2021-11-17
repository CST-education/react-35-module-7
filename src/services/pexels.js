import axios from 'axios';
const base_url = `https://api.pexels.com/v1/`;
const api_key = `563492ad6f91700001000001390f9fee0a794c1182a72e49e0e0eae2`;
// const zhenya_key = `563492ad6f917000010000018ad09ac3acee45ebbb46a78f456e8ffa`;
// OOP
export class PexelsFetchObject {
  constructor() {
    this.base_url = base_url;
    this.api_key = api_key;
    this._searchQuery = '';
    this._page = 1;
    this._perPage = 5;
    this.endPoint = '';
  }
  get searchQuery() {
    return this._searchQuery;
  }
  set searchQuery(value) {
    return (this._searchQuery = value);
  }
  get page() {
    return this._page;
  }
  set page(value) {
    if (value === 1) {
      return (this._page += value);
    } else {
      return (this._page = value);
    }
  }
  resetPage() {
    return (this._page = 1);
  }
  get perPage() {
    return this._perPage;
  }
  set perPage(value) {
    return (this._perPage = value);
  }
  async getImageInfo(id) {
    axios.defaults.baseURL = this.base_url;
    axios.defaults.headers.common.Authorization = this.api_key;
    this.endPoint = 'photos';
    let params = `/${id}`;
    let url = this.endPoint + params;
    try {
      const result = await axios.get(url);
      const data = result.data;
      if (result.status === 400) throw new Error({ message: 'Bad Request' });
      if (result.status === 200) return data;
    } catch (err) {
      return err.message;
    }
  }
  async searchPhotos() {
    console.log('this.searchQuery', this.searchQuery);
    axios.defaults.baseURL = this.base_url;
    axios.defaults.headers.common.Authorization = this.api_key;
    this.endPoint = 'search';
    if (!this.searchQuery) {
      alert(`Enter the search value please!`);
      return;
    }
    let params = `?query=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}`;
    let url = this.endPoint + params;

    try {
      const result = await axios.get(url);
      const data = result.data.photos;
      if (result.status === 400) throw new Error({ message: 'Bad request' });
      if (result.status === 200) return data;
    } catch (err) {
      return err.message;
    }
  }
}
