import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button} from 'antd';
import Style from './index.module.less'
class HeadTitle extends Component{
    render(){
        return(
            <div className={Style.page}>
                <span>新增特点</span>
                <Button onClick={()=>{
                    this.props.history.go(-1);
                }}>返回</Button>
            </div>
        )
    }
}
export default withRouter(HeadTitle);