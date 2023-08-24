import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import scheduleReducer from './slices/scheduleSlice'
import videoSliceReducer from './slices/videoSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        schedule: scheduleReducer,
        video: videoSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})

export default store