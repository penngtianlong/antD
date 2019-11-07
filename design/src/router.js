
import React ,{Fragment}from 'react'
import {HashRouter,Link,Switch,Route,withRouter,Redirect} from 'react-router-dom'
import loadable from './utils/loadable'
// import Classify from "./pages/classify/classify"; //方法
const Login=loadable(()=>import('./pages/login/login'))
const Home=loadable(()=>import('./pages/home/home'))
const Admin=loadable(()=>import('./pages/admin/admin'))
const Category=loadable(()=>import('./pages/category/category'))
//分类
const Classify=loadable(()=>import('./pages/classify/classify'))
const ClassifyAdd=loadable(()=>import('./pages/classify/classifyadd'))
const ClassifyUpdate=loadable(()=>import('./pages/classify/classifyupdate'))
//用品品牌
const Brand = loadable(() => import('./pages/brand/brand'))
const BrandAdd = loadable(() => import('./pages/brand/brandAdd'))
const BrandUpdate = loadable(() => import('./pages/brand/brandUpdate'))
//品类
const AddCategory = loadable(() => import('./pages/category/addCategory'))
//特点
const Feature = loadable(() => import('./pages/feature/feature'));
const AddFeature = loadable(() => import('./pages/addfeature/addfeature'));
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
                                <Route path='/admin/addCategory' component={AddCategory}></Route>

                                <Route path='/admin/classify' component={Classify}></Route>
                                <Route path='/admin/classifyadd' component={ClassifyAdd}></Route>
                                <Route path='/admin/classifyupdate' component={ClassifyUpdate}></Route>


                                <Route exact path='/admin/brand' component={Brand}></Route>
                                <Route exact path='/admin/brandAdd' component={BrandAdd}></Route>
                                <Route exact path='/admin/brandUpdate' component={BrandUpdate}></Route>


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