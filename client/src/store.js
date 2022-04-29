import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationRed';
import userReducer from './reducers/userRed';
import postReducer from './reducers/postRed';
import subReducer from './reducers/subRed';
import postCommentsReducer from './reducers/postComRed';
import userPageReducer from './reducers/userPageRed';
import subPageReducer from './reducers/subPageRed';
import searchReducer from './reducers/searchRed';
import themeReducer from './reducers/themeRed';

const reducer = combineReducers({
    user: userReducer,
    notification: notificationReducer,
    posts: postReducer,
    postComments: postCommentsReducer,
    subs: subReducer,
    userPage: userPageReducer,
    subPage: subPageReducer,
    search: searchReducer,
    darkMode: themeReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;