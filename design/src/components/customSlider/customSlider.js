import React ,{Fragment}from 'react'
import {HashRouter,Link,Switch,Route,withRouter,Redirect} from 'react-router-dom'



import Style from './index.module.less'

import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;





class CustomSlider extends React.Component{
    constructor(){
        super()
        this.state={
            rootList:[]
        }
    }
    componentDidMount(){
        this.$axios.post('http://10.60.12.88:8888/homeNav').then((res)=>{
            // console.log(res);
            if(res.code==1){
                // console.log(res.message);
                this.state.rootList=res.list;
                this.setState({rootList:res.list.data});
                // console.log(this.state.rootList);
            }
        })

    }
    jump=(path)=>{
        this.props.history.push(path)
    }
    renderItem=(data)=>{
        // 1.判断 children  有 sub  没有 item
        return data.map((item,index)=>{
            if(item.children){
                // 渲染次级
                // return(
                //     <SubMenu title={item.name}>
                //         {this.renderItem(item.children)}
                //     </SubMenu>
                // )
            }else{

                return (
                    <Menu.Item key={item._id} onClick={this.jump.bind(this,item.path)} className={Style.menu}>
                        <span className={Style.item}>{item.title}</span>
                    </Menu.Item>
                )
            }
        })
    }
    render(){
        return(
            <Menu  style={{ width: 200 }} mode="vertical" theme='dark'>
                <div className={Style.name}>车巴巴</div>
                {this.renderItem(this.state.rootList)}
            </Menu>
        )
    }
}
export default withRouter(CustomSlider)