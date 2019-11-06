import React from 'react'
import {Card,message,Button} from 'antd'
import {withRouter} from 'react-router-dom'
import Style from './category.module.less'
import { Select } from 'antd';
const { Option } = Select;
function handleChange(value) {
    console.log(`selected ${value}`);
}
class Category extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    componentDidMount(){
        this.$axios.post('http://10.60.12.88:8888/getClassifyNav').then((res)=>{
            console.log(res);

        })
    }
    jump=(path)=>{
        this.props.history.push(path)
    }
    render(){
        return(
            <div className={Style.main}>
                <span className={Style.tiaojian}>请输入查询条件:</span>
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Button onClick={this.jump.bind(this,'/admin/addCategory')}>新增品类</Button>
            </div>
        )
    }
}
export default withRouter(Category)