import React,{Component} from 'react';
import {Card, Input, message, Select,Button,Radio } from 'antd';
import Style from "../featureupdate/featureupdate.module.less";
//新增特点

const { Option } = Select;
class UpdateFeature extends Component{
    constructor(props){
        super();
        this.state=props;
    }
    //渲染select框
    renderSelect=(arr,caditon)=>{
        // console.log("渲染select框",arr)
        // setTimeout((arr,caditon)=>{
        // defaultValue={arr[0].title}
        // },100)
        let {data} = this.state;
        // console.log(this.state)
        // console.log("data",data)
        switch (caditon) {
            case "classifyName":
                return(
                    <Select defaultValue={data.classifyName} style={{ width: 220 }} onChange={this.handleChange.bind(this,caditon)}>
                        {arr.map((item)=>(<Option key={item._id} value={item.classifyName}>{item.classifyName}</Option>))}
                    </Select>
                )
                break;
            case "categoryName":
                return(
                    <Select defaultValue={data.categoryName} style={{ width: 220 }} onChange={this.handleChange.bind(this,caditon)}>
                        {arr.map((item)=>(<Option key={item._id} value={item.categoryName}>{item.categoryName}</Option>))}
                    </Select>
                )
                break;

        }
    }
    //添加条件
    handleChange=(caditon,value)=>{
        // console.log("caditon",caditon);
        // console.log("value",value);
        switch (caditon) {
            case "classifyName":
                // this.state.classifyName=value;
                this.setState({classifyName:value});
                break;
            case "categoryName":
                // this.state.categoryName=value;
                this.setState({categoryName:value});
                break;
        }
    }
    //特点状态
    onChange = e => {
        // console.log('radio checked', e.target.value);
        // this.state.status=e.target.value;
        // let status = Boolean(this.state.status);
        // status=e.target.value
        // this.state.status=e.target.value;
        // let status=(e.target.value).toString()
        this.setState({status:e.target.value});
        // console.log("change",this.state.status)
    };
    //提交数据
    submit=()=>{
        let {_id} = this.state.data;
        let {classifyName,categoryName,sort,status,traitName} = this.state;
        let statusString=status.toString();
        // console.log(status)
        // console.log("修改data",this.state)
        // console.log("state11",this.state)
        this.$axios.post('http://10.60.12.88:8888/upDataTraitData',{_id,classifyName,categoryName,sort,status:statusString,traitName}).then((data)=>{
            // console.log("修改",data)
            if (data.data.code === 1) {
                message.success(data.data.message)
                this.props.cacelUpdate(1);
            }else{
                message.success(data.data.message)
            }
        })
    }
    render(){
        let {classifyNav,categoryNav,data,sort,status,traitName} = this.state;
        // let {classifyName,categoryName} = this.state.data;
        // console.log("update",this.state)
        console.log("status",status)
        // let statusBoolean=Boolean(status)
        return(
            <div className={Style.upDate}>
                <Card>

                        <div className={Style.item}>
                            <label>所属分类：</label>
                            {this.renderSelect(classifyNav,"classifyName")}
                        </div>
                        <div className={Style.item}>
                            <label>所属品类：</label>
                            {this.renderSelect(categoryNav,"categoryName")}
                        </div>
                        <div className={Style.item}>
                            <label>特点名称：</label>
                            <div><Input className={Style.itemInput} placeholder="特点名称" value={traitName} onChange={(e)=>{
                                this.setState({traitName:e.target.value});
                                {/*console.log(this.state.mFeatureName)*/}
                                // this.state.data.traitName=e.target.value

                            }} /></div>
                        </div>
                        <div className={Style.item}>
                            <label>排&emsp;&emsp;序：</label>
                            <div><Input className={Style.itemInput} placeholder="999" value={sort} onChange={(e)=>{
                                this.setState({sort:e.target.value});
                                {/*console.log(this.state.mFeatureName)*/}
                                // this.state.data.sort=e.target.value
                            }} /></div>
                        </div>
                        <div className={Style.item}>
                            <label>状&emsp;&emsp;态：</label>
                            <div className={Style.itemInput}>
                                <Radio.Group onChange={this.onChange} value={status}>
                                    <Radio value={true}>启用</Radio>
                                    <Radio value={false}>停用</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className={Style.item}>
                            <Button onClick={this.submit}>保存</Button>
                            <Button onClick={()=>{
                                this.props.cacelUpdate(0)
                            }}>取消</Button>
                        </div>

                </Card>



            </div>
        )
    }
}
export default UpdateFeature;