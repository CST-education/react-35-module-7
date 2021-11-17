class Component: functional

1. state={ key1: value1, key2: value2, array: [] }

2. 2.1 CDM

   2.2 CDU

   2.3 CWU

3. render(){ return () }

<!-- ========= -->

```
import { useState } from 'react'
```

functional return ()

1. useState() - 1 property of state

```
const [key1, setKey1] = useState(init_value1)
const [key2, setKey2] = useState(init_value2)
const [array, setArray] = useState(()=>{JSON.parse(localStorage.getItem('array')) ?? [] } )
```

2. useEffect( ()=>{

    //statement CDM & CDU

    return ()=>{//} CWU

    },[зависимые значения - переменные])
    
[пустой] - CDM - выполнится 1 раз
[НЕ пустой] - CDU - выполнится каждый раз при изменении значения в массиве зависимостей
return ()=>{//} - CWU - выполнится каждый раз при изменении значения в массиве зависимостей

3. this.state.value => value
this.handleClick => handleClick

4. useLS() - свой хук

LESSON 2

- useState(init) || useState(()=>{}) - ХРАНИТ данные (ссылку) между ререндерами, при изменении вызывает ререндер

- useEffect(()=>{
    return ()=>{}
}, [])
======
- useRef() - ХРАНИТ данные (ссылку) между ререндерами, при изменении НЕ вызывает ререндер

- useCallback(()=>{}, []) - запоминает ссылку на функцию между ререндерами (для обработчиков событий)

- useMemo(()=>{}, []) - запоминает (мемоизирует) РЕЗУЛЬТАТ ВЫЧИСЛЕНИЙ между вызвами и ререндерами (для сложных вычислений и фильтров)

4. useToggle() - свой хук