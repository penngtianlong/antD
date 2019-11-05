import React from 'react'
import {Card,message} from 'antd'
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

    render(){
        return(
            <div className={Style.main}>
                <span className={Style.tiaojian}>请输入查询条件:</span>
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </div>
        )
    }
}
export default Category