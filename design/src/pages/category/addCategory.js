import React from 'react'
import {Card,message,Button,Input} from 'antd'
import { Select } from 'antd';
import Style from './addCategory.module.less'
const { Option } = Select;

class addCategory extends React.Component{

    constructor(){
        super()
        this.state={
            select:[

            ]
        }
    }
    componentDidMount(){
        this.$axios.post('http://10.60.12.88:8888/getClassifyNav').then((res)=>{
            // console.log(res);
            if(res.code===1){
                this.state.select=res.list;
                this.setState({select:this.state.select})

            }
        })
    }
    render(){
        let {select}=this.state;
        return(
           <div className={Style.main}>
               <div className={Style.add}>这是新增品类页面</div>

               <div className={Style.content}>
                   <label className={Style.label}>所属分类：</label>
                   <Select defaultValue={this.state.start} style={{ width: 200 }}>
                       {
                           select.map((item,index)=>{
                               return(
                                   <Option key={index}>{item.classifyName}</Option>
                               )
                           })
                       }

                   </Select><br/><br/><br/>

                   <div>
                       <label className={Style.label}>品类名称：</label><Input style={{ width: 200 }}/><br/><br/><br/>
                       <label className={Style.label}>品类封面图：</label><Input style={{ width: 200 }}/><br/><br/><br/>
                       <label className={Style.label}>排序：</label><Input style={{ width: 200 }}/><br/><br/><br/>
                       <label className={Style.label}>状态：</label>
                           <label><input type="radio" name="status" value="启用" />启用</label>&emsp;&emsp;&emsp;&emsp;
                           <label><input type="radio" name="status" value="停用" />停用</label>
                       <br/><br/><br/>
                   </div>

               </div>

           </div>
        )
    }
}
export default addCategory