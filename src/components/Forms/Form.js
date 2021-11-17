import { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addProduct } from '../../redux/products/actions';

class Form extends Component {
  prodIdtitle = uuid();
  prodIdDesc = uuid();
  prodIdSize = uuid();
  prodIdokGoogle = uuid();

  state = {
    title: '',
    desc: '',
    size: '',

    okGoogle: false,

    product: null,
  };

  handleCheck = e => {
    // console.log('value:', e.target.value); // нам не надо
    const { name, checked } = e.target;
    const { okGoogle } = this.state;
    console.log('name:', name);
    console.log('checked:', checked);
    this.setState({
      okGoogle: !okGoogle,
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleChangeAllInputs = e => {
    const { name, type, checked, value } = e.target;
    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, desc, size } = this.state;
    const product = {
      id: uuid(),
      title,
      description: desc,
      size,
    };
    this.setState({ product }); // тут для себя пишем новый объект продукта в свой лок стейт
    // this.props.addNewProduct(product); // !!!метод из App!!!
    this.props.onAdd(product); // диспатчим продукт в редакс
    this.resetForm();
  };
  resetForm = () => {
    this.setState({ ...this.state });
  };

  render() {
    // console.log('productsList prop from STORE:', this.props.productsList);
    console.log('method ADD with action', this.props.onAdd);
    const { title, desc, size, okGoogle } = this.state;
    const {
      handleChangeAllInputs,
      handleSubmit,
      prodIdtitle,
      prodIdDesc,
      prodIdSize,
      prodIdokGoogle,
    } = this;

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor={prodIdtitle}>Title</label>
        <input
          type="text"
          id={prodIdtitle}
          name="title"
          value={title}
          onChange={handleChangeAllInputs}
        />
        <br />
        <label htmlFor={prodIdDesc}>Description</label>
        <input
          type="text"
          id={prodIdDesc}
          name="desc"
          value={desc}
          onChange={handleChangeAllInputs}
        />
        <br />
        <label htmlFor={prodIdSize}>Choose your size</label>
        <select
          name="size"
          value={size}
          onChange={handleChangeAllInputs}
          id={prodIdSize}
        >
          <option value="" disabled>
            ...
          </option>
          <option value="s">s</option>
          <option value="m">m</option>
          <option value="l">l</option>
        </select>
        <br />
        <label htmlFor={prodIdokGoogle}>Agree?</label>
        <input
          type="checkbox"
          name="okGoogle"
          id={prodIdokGoogle}
          checked={okGoogle}
          onChange={handleChangeAllInputs}
        />
        <br />
        <button type="submit" disabled={!okGoogle}>
          add
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAdd: prod => dispatch(addProduct(prod)),
  };
};

export default connect(null, mapDispatchToProps)(Form);
