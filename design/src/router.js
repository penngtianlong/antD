import React, {Fragment} from 'react'
import {HashRouter, Link, Switch, Route, withRouter, Redirect} from 'react-router-dom'
import loadable from './utils/loadable' //方法
const Login = loadable(() => import('./pages/login/login'))
const Home = loadable(() => import('./pages/home/home'))
const Admin = loadable(() => import('./pages/admin/admin'))
const Category = loadable(() => import('./pages/category/category'))
//用品品牌
const Brand = loadable(() => import('./pages/brand/brand'))
const BrandAdd = loadable(() => import('./pages/brand/brandAdd'))
const BrandUpdate = loadable(() => import('./pages/brand/brandUpdate'))
//
const AddCategory = loadable(() => import('./pages/category/addCategory'))
const Feature = loadable(() => import('./pages/feature/feature'));//特点
const AddFeature = loadable(() => import('./pages/addfeature/addfeature'));
// const AddCategory=loadable(()=>import('./pages/category/addCategory'))
class RootRoute extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Redirect exact from='/' to='/login'></Redirect>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/admin' component={() => {
                        return (
                            <Admin>
                                <Route path='/admin/home' component={Home}></Route>
                                <Route path='/admin/category' component={Category}></Route>
                                //用品品牌
                                <Route exact path='/admin/brand' component={Brand}></Route>
                                <Route exact path='/admin/brandAdd' component={BrandAdd}></Route>
                                <Route exact path='/admin/brandUpdate' component={BrandUpdate}></Route>
                                //
                                <Route path='/admin/addCategory' component={AddCategory}></Route>
                                <Route path='/admin/feature' component={Feature}></Route>
                                <Route path='/admin/addfeature' component={AddFeature}></Route>
                            </Admin>
                        )
                    }}></Route>

                </Switch>
            </HashRouter>
        )
    }
}

export default RootRoute