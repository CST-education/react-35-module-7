// импортируем компонент окна с подтверждением удаления DeleteButton
import DeleteButton from '../Widgets/RemoveItem';
import s from './Products.module.css';
import { SolidTitle } from '../Titles/SolidTitle';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { getProducts } from '../../redux/products/selectors';
// создаем компонент списка продуктов

export default function ProductList() {
  const products = useSelector(getProducts);
  return (
    <>
      <SolidTitle titleText="Product List" />
      {/* <h2>Product List</h2> */}
      <ul>
        {products.map(product => {
          return (
            <li key={product.id} className={s.productItem}>
              <h3 className={s.productTitle}>{product.title}</h3>
              <p className={s.productDesc}>{product.description}</p>
              <DeleteButton id={product.id} />
              {/* рендерим  компонент окна с подтверждением удаления DeleteButton */}
              {/* передаем через пропс метод удаления продукта и его id */}
            </li>
          );
        })}
      </ul>
    </>
  );
}

// function ProductList({ products, onDeleteProduct }) {
//   return (
//     <>
//       <SolidTitle titleText="Product List" />
//       {/* <h2>Product List</h2> */}
//       <ul>
//         {products.map(product => {
//           return (
//             <li key={product.id} className={s.productItem}>
//               <h3 className={s.productTitle}>{product.title}</h3>
//               <p className={s.productDesc}>{product.description}</p>
//               <DeleteButton id={product.id} />
//               {/* рендерим  компонент окна с подтверждением удаления DeleteButton */}
//               {/* передаем через пропс метод удаления продукта и его id */}
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// }

// const mapStateToProps = state => ({
//   products: state.products,
// });

// export default connect(mapStateToProps)(ProductList);
