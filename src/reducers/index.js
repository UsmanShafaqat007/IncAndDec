import changeNumber from './incAndDnc'
import changeNumber2 from './incAndDnc2'

import {combineReducers} from 'redux'

const rootReducer=combineReducers({
    changeNumber,changeNumber2
    //any other reducer if available
})

export default rootReducer;