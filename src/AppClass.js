import './App.scss';
import { Component } from 'react';
import { Form } from './components/Forms/Form';
//  ===  ИМПОРТ КОМПОНЕНТА СПИСКА ПРОДУКТОВ
import { ProductList } from './components/Products/ProductList';
import { Modal } from './components/Modal/Modal';

import { SearchFrom } from './views/PexelsImages/SearchForm';
import { ImagesList } from './views/PexelsImages/ImagesList';

// let searchQuery = 'banana';
// let searchPage = 1;
// let searchPerPage = 5;
// let endPoint = 'search';
// let params = `?query=${searchQuery}&page=${searchPage}&per_page=${searchPerPage}`;
// let url = endPoint + params;

class App extends Component {
  state = {
    counter: 0,
    isOpen: false,

    allProducts: [],
    showModal: false,
    searchValue: '',
    perPage: 5,
  };
  componentDidMount() {
    // console.log(`MOUNT`);
    const localProducts = localStorage.getItem('products');
    const parseProducts = JSON.parse(localProducts);
    if (parseProducts) {
      this.setState({ allProducts: parseProducts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(`UPDATE`);
    // если изменилось значение поля стейта prevState.prop
    // То будем переписывать локалСторедж
    if (prevState.allProducts !== this.state.allProducts) {
      localStorage.setItem('products', JSON.stringify(this.state.allProducts));
    }
    // if (prevState.searchValue !== this.state.searchValue) {
    //   console.log(`dd`);
    // }
  }
  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentWillUnmount() {
    // console.log(`UNMOUNT`);
  }

  addNewProduct = obj =>
    this.setState(prevState => ({
      allProducts: [...prevState.allProducts, obj],
    }));

  //  ===  метод удаления продукта
  deleteProduct = id =>
    this.setState(prev => ({
      allProducts: prev.allProducts.filter(prod => prod.id !== id),
    }));
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  // MODULE 3 LESSON 2

  getSearchValues = (searchValue, perPage) =>
    this.setState({ searchValue, perPage });

  render() {
    // console.log(`RENDER method`);
    const { searchValue, perPage } = this.state;
    return (
      <div className="App">
        <SearchFrom getSearchValues={this.getSearchValues} />
        {/* <ImagesList searchValue={searchValue} perPage={perPage} /> */}

        {this.state.showModal && (
          <Modal toggleModal={this.toggleModal}>
            <Form addNewProduct={this.addNewProduct} />
          </Modal>
        )}
        <h1>FE-35 Product</h1>
        <button type="button" onClick={this.toggleModal}>
          Add Product
        </button>
        {/* === РЕНДЕР КОМПОНЕНТА СПИСКА ПРОДУКТОВ === */}
        <ProductList
          products={this.state.allProducts}
          onDeleteProduct={this.deleteProduct}
        />
      </div>
    );
  }
}
export default App;
