```
import { createSelector } from '@reduxjs/toolkit'

const selector = createSelector([sel1, sel2], (value1, value2)=>{
    const normValue2 = value2.toLowerCase()
    return value1.filter(el=>{
        return el.prop.toLowerCase().includes(normValue2)
    })
})
```
