import React ,{Fragment}from 'react'
import {HashRouter,Link,Switch,Route,withRouter,Redirect} from 'react-router-dom'
import loadable from './utils/loadable' //方法


const Login=loadable(()=>import('./pages/login/login'))
const Home=loadable(()=>import('./pages/home/home'))
const Admin=loadable(()=>import('./pages/admin/admin'))
const Category=loadable(()=>import('./pages/category/category'))
const AddCategory=loadable(()=>import('./pages/category/addCategory'))
// const AddCategory=loadable(()=>import('./pages/category/addCategory'))

class RootRoute extends React.Component{
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Redirect exact from='/' to='/login'></Redirect>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/admin' component={()=>{
                        return(
                            <Admin>
                                <Route path='/admin/home' component={Home}></Route>
                                <Route path='/admin/category' component={Category}></Route>
                                <Route path='/admin/addCategory' component={AddCategory}></Route>
                            </Admin>
                        )
                    }}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
export default RootRoute