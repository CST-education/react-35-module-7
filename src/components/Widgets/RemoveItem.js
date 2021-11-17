import { Component, createRef } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { connect } from 'react-redux';
import './RemoveItem.scss';
import { GadgetWindow } from './WindowElem';
import { deleteProduct } from '../../redux/products/actions';
class DeleteButton extends Component {
  state = {
    isOpen: this.props.isOpen,
  };
  // получаем доступ к текущему элементу через createRef()
  ref = createRef();

  // создаем метод изменения свойства видимости в стейте
  toggleState = () => {
    //  если текущее значение true выходим из метода
    if (this.state.isOpen) return;
    // изменяем стейт от предыдущего состояния
    this.setState(prev => ({
      isOpen: !prev.isOpen,
    }));
    // фокусируемся на текущем элементе
    this.ref.current.focus();
  };

  keydownHandler = event => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      this.toggleState();
    }
  };

  handleClick = () => this.setState({ isOpen: false });

  // ===  Добавляем обработчик клика для кнопки Delete и вызываем полученный через пропс
  // метод удаления продукта и передаем его же полученный id
  handleDelete = () => {
    // this.props.onDelete(this.props.id); // раньше получали метод из родителя
    this.props.onDeleteProduct(this.props.id);
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
    const {
      ref,
      keydownHandler,
      toggleState,
      handleClick,
      // деструктуризируем handleDelete
      handleDelete,
    } = this;
    return (
      <Flipper flipKey={isOpen} spring="stiff" stagger>
        {isOpen ? (
          <GadgetWindow
            unitRef={ref}
            isOpen={isOpen}
            toggleState={toggleState}
            keydownHandler={keydownHandler}
            handleClick={handleClick}
            // === передаем обработчик клика для кнопки Delete
            handleDelete={handleDelete}
            textObj={this.props.text}
          />
        ) : (
          <Flipped flipId="wrapper">
            <div
              ref={ref}
              tabIndex={0}
              role="button"
              className="button primary"
              onClick={toggleState}
              onKeyDown={keydownHandler}
            >
              <Flipped flipId="action">
                <span className="action">Delete</span>
              </Flipped>
            </div>
          </Flipped>
        )}
      </Flipper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onDeleteProduct: id => dispatch(deleteProduct(id)),
});

export default connect(null, mapDispatchToProps)(DeleteButton);
