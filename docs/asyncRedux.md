## Async operations

```
export const operation = () => dispatch => {
    dispatch(actionRequest())
    fetch(url).then((data)=>{
        dispatch(actionSuccess(data))
    }).catch((err)=>{
        dispatch(actionError(err))
    })
}

```

```
export const operation = () => async dispatch => {
    dispatch(actionRequest())
    try{
        const data = await fetch(url)
        dispatch(actionSuccess(data))
    } catch(err) {
        dispatch(actionError(err))
    }
}

```

## Asunc Thunk

в файле operations.js

```
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk('action/name', async ( value, { rejectWithValue } ) => {
    try {
        const data = await fetch(url)
        return data
    } catch(err) {
        return rejectWithValue(err)
    }
})
```

тогда в редукторе вместо экшенов импортируем операции и будет следующий код:

```
import operation from './operations.js'

export const reducer = createReduser("", {
    [operation.pending]: (_, action) => action.payload,
    [operation.fulfilled]: (_, action) => action.payload,
    [operation.rejected]: (_, action) => action.payload,
})
```

## Slice

```
import { createSlice } from '@reduxjs/toolkit'

const slice = createslice({
    name: "name",
    initialState: {name: "", age: 0},
    reducers: {
        <!-- for sync -->
    },
    extraReducers: {
        [operation.pending]: (state, action) => {
             return {
                ...state,
                isLoading: true
            }
        },

        <!-- WARN работаем с целым стейтом и мутируем его -->
        [operation.fulfilled]: (state, action) => state.array.push(action.payload),

        <!-- или -->
         [operation.fulfilled]: (state, action) => {
             return {
                 ...state,
                 array: [...state, ...action.payload],
                 isLoading: false
             }
         },

        [operation.rejected]: (_, action) => {
            return {
                ...state,
                isLoading: false
            }
        },
    }
})
```
