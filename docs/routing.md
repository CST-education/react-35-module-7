# LESSON 7

## URL

- origin - protocol + host
- pathname - path + params
- search/query string - ?key1=value1&key2=value2
- hash - #contacts

## History

Browser History - HTML5 History API Hash history - для старых браузеров Memory
History

## Routing

`npm i react-router-dom`

1. маршрутизатор: BrowserRouter
   `import { BrowserRouter } from 'react-router-dom'` оборачиваем в компонент
   маршрутизатора компонент всего приложения в корневом файле index.js для
   отслеживания адресной строки и обеспечения переходов между страницами

2. навигация: Link, NavLink (как Link, но с доп. пропсом activeClassName, в кот.
   можно передать селектор со стилями, когда ссылка активна) для каждой
   отдельной страницы создаем компонент маршрута и передаем ему следующие
   пропсы:

- to - строка, должна совпадать с пропсом path в соответствующем рауте
- exact - указывает на точное совпадение пути не пергружает страницу, а
  добавляет запись о переходе в историю

3. маршруты: Route, Redirect, Switch, `import { Route } from 'react-router-dom'`
   для каждой отдельной страницы создаем компонент маршрута и передаем ему
   следующие пропсы:

- path - строка, должна совпадать с пропсом to соответствующей ссылки
- exact - по умолчанию true, отрендерит компонент указанный в пропсе component,
  если значение пропса path и location.pathname совпадает
- component - Symbol, компонент страницы, предназначеный для рендера в текущем
  маршруте

4. асинхронная загрузка компонентов страниц import { lazy, Suspense } from
   'react'

const Component = lazy(() => import("./Page" /_ webpackChunkName: 'Page'_/))

!!! При асинхронной загрузке компонентов (через lazy) обязательно удалять
статические импорты этих компонентов!!!

Все рауты, что рендерят асинхронно загружаемые страницы, обернуть в компонент
Suspense, указав обязательный проп fallback, куда можно передать компонент
лоадера или просто сообщение о загрузке

# LESSON 7

- match - объект с данными о совпадении location.pathname из ссылки и path из
  раута { isExact: bool, // точно ли должны совпадать location.pathname и path
  params: {}, // динамические параметры, например id path: "", url: "" } хуки:
  useRouteMatch(), useParams()

- location - объект с данными о текущем URL { key: "", hash: "", pathname:
  "/pexels", state: { from: "/" }, search: "?key1=value1" } хук: useLocation()

Для извлечения location.search используется:

- URLSearchParams() - встроенный метод;
- queryString.parce() - библиотека;

- history - объект истории переходов, хранит методы: .push() - добавить запись
  .replace() - заменить текущую на указанную хук: useHistory()

1. настроить переход на страницу карточки

- создать страницу карточки
- в компоненте списка завернуть в Link элементы, у которых должны быть отдельные
  карточки

## useLocation

import { Link, useLocation } from 'react-router-dom';  
const location = useLocation();

```<Link
      to={{
         pathname: `pexels/${el.id}`, // куда перейти
         state: {
            from: { // откуда переходим
               location, // текущий URL
               label: `come back to list`, // свои доп данные
                  },
               },
         }}
      ><img src={el.src.tiny} alt={el.photographer} />
   </Link>
```

ИЛИ

## useRouteMatch для вложенных раутов

const match = useRouteMatch() console.log(match) // {url: "", path: ""}

```
<Link to={`${match.url}/${el.id}`}>...</Link>
```

```
<Route path={`${match.path}/contacts`}/>
```

- создать компонент страницы о фото ImageCard и добавить ее в роуты App.js

```
const ImageCardPage = lazy(() =>
  import(
    './views/PexelsImages/ImageCard' /* webpackChunkName: 'ImageCard Page'*/
  ),
);
```

!! чтобы рендерить раут отдельной страницы, нужно установить exact для раута
страницы списка, а рауту отдельной страницы указать динамический параметр

```
 <Route path="/pexels/:imageId" component={ImageCardPage} />
```

2. создать и настроить кнопку come back

```
import { useHistory, useLocation } from 'react-router-dom';

export function ComeBackButton() {
  const history = useHistory();
  const location = useLocation();
  const onClickFunction = e => {
    history.push(location?.state?.from?.location ?? '/');
  };
  return (
    <button type="button" onClick={onClickFunc}>
      {location?.state?.from?.label ?? 'Go back'}
    </button>
  );
}
```

### компонент ImageList

```
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

  const location = useLocation();
  console.log('location:', location);

  const match = useRouteMatch();
  console.log('match:', match); // {url: "", path: ""}

  <Link
                  // передаем объект location, в котором
                  to={{
                    // динамически подставляем params - id карточки
                    pathname: `/pexels/${el.id}`,
                    // добавим текущий маршрут
                    state: {
                      from: {
                        location,
                        label: `back to pexels`,
                      },
                    },
                  }}
                >
                  <img src={el.src.tiny} alt={el.photographer} />
                </Link>
```

### компонент ImageCard

```
import { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router';
import { PexelsFetchObject } from '../../services/pexels';
const fetchImage = new PexelsFetchObject();

export default function ImageCard() {
  // получаем динамические параметры карточки
  const params = useParams();
  console.log('params', params);

  const [imageInfo, setImageInfo] = useState(null);

  useEffect(() => {
    //   запрос подробностей по id из полученного params
    fetchImage
      .getImageInfo(params.imageId)
      .then(setImageInfo)
      .catch(err => alert(`Error!!`));
  }, [params.imageId]);

  const history = useHistory();
  console.log('Card history:', history);
  const location = useLocation();
  console.log('Card location:', location);

  const handleClick = () => {
    // если страница карточки открыта в новой сессии,
    // где нет сохраненного location.state для возврата, то
    // указываем путь явно
    history.push(location?.state?.from?.location ?? '/pexels');
  };

  const color = imageInfo ? imageInfo.avg_color : 'transparent';

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        style={{
          background: `${color}`,
          padding: '10px 20px',
          display: 'block',
        }}
      >
        {location?.state?.from?.label ?? 'Go back'}
      </button>
      {imageInfo ? (
        <article id={imageInfo.id}>
          <h2>{imageInfo.photographer}</h2>
          <img
            src={imageInfo.src.original}
            alt="origin size"
            style={{ objectFit: 'contain', width: '100%' }}
          />
        </article>
      ) : (
        <p>No match found</p>
      )}
    </>
  );
}

```

### компонент App

```
const ImageCardPage = lazy(() =>
  import(
    './views/PexelsImages/ImageCard' /* webpackChunkName: 'ImageCard Page'*/
  ),
);

            <Route exact path="/pexels">
              <PexelsPage title="MAin Title" />
            </Route>
            <Route path="/pexels/:imageId" component={ImageCardPage} />

```
