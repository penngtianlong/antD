import React,{Component} from 'react';
import {Card, Input, message, Select,Button,Radio } from 'antd';
import Style from "../addfeature/addfeature.module.less";
//新增特点
import HeadTitle from '../../components/headerTitle/headerTitle';

const { Option } = Select;
class AddFeature extends Component{
    constructor(){
        super();
        this.state={
            classifyName:"",
            categoryName:"",
            sort:"",
            traitName:"",
            status:true,
            classifyNav:[],
            categoryNav:[],
        }
    }

    componentDidMount(){
        this.getClassifyList()
    }
    getClassifyList(){
        this.$axios.post("http://10.60.12.88:8888/getTraitData").then((data)=>{
            // console.log("获取数据",data)
            if (data.code === 1) {
                this.setState({classifyNav:data.data.classifyNav,categoryNav:data.data.categoryNav})
                console.log(this.state.classifyNav,this.state.categoryNav)
            }
        })
    }
    //渲染select框
    renderSelect=(arr,caditon)=>{
        // setTimeout((arr,caditon)=>{
        // defaultValue={arr[0].title}
        // },100)
        switch (caditon) {
            case "classifyName":
                return(
                    <Select style={{ width: 220 }} onChange={this.handleChange.bind(this,caditon)}>
                        {arr.map((item)=>(<Option key={item._id} value={item.classifyName}>{item.classifyName}</Option>))}
                    </Select>
                )
                break;
            case "categoryName":
                return(
                    <Select style={{ width: 220 }} onChange={this.handleChange.bind(this,caditon)}>
                        {arr.map((item)=>(<Option key={item._id} value={item.categoryName}>{item.categoryName}</Option>))}
                    </Select>
                )
                break;

        }
       /* return(
            <Select style={{ width: 120 }} onChange={this.handleChange.bind(this,caditon)}>
                {arr.map((item)=>(<Option key={item._id} value={item.classifyName}>{item.classifyName}</Option>))}
            </Select>
        )*/

    }
    //添加条件
    handleChange=(caditon,value)=>{
        // console.log("caditon",caditon);
        // console.log("value",value);
        switch (caditon) {
            case "classifyName":
                this.setState({classifyName:value});
                break;
            case "categoryName":
                this.setState({categoryName:value});
                break;
        }
        // return value;
    }
    //特点状态
    onChange = e => {
        // console.log('radio checked', e.target.value);
        this.setState({
            status: e.target.value,
        });
    };
    //提交数据
    submit=()=>{
        let {classifyName,categoryName,sort,status,traitName} = this.state;
        console.log("submitStatus",status)
        let statusString=status.toString();
        this.$axios.post('http://10.60.12.88:8888/addTraitData',{classifyName,categoryName,sort,status:statusString,traitName}).then((data)=>{
            // console.log(data)
            if (data.data.code === 1) {
                message.success(data.data.message)
            }else{
                message.success(data.data.message)
            }
        })
    }
    render(){
        let {classifyNav,categoryNav} = this.state;
        return(
            <div className={Style.page}>
                <Card>
                    <HeadTitle></HeadTitle>
                    <hr/>
                    <div className={Style.addMessage}>
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
                            <div><Input className={Style.itemInput} placeholder="特点名称" value={this.state.traitName} onChange={(e)=>{this.setState({traitName:e.target.value});{/*console.log(this.state.mFeatureName)*/}}} /></div>
                        </div>
                        <div className={Style.item}>
                            <label>排&emsp;&emsp;序：</label>
                            <div><Input className={Style.itemInput} placeholder="999" value={this.state.sort} onChange={(e)=>{this.setState({sort:e.target.value});{/*console.log(this.state.mFeatureName)*/}}} /></div>
                        </div>
                        <div className={Style.item}>
                            <label>状&emsp;&emsp;态：</label>
                            <div className={Style.itemInput}>
                                <Radio.Group onChange={this.onChange} value={this.state.status}>
                                    <Radio value={true}>启用</Radio>
                                    <Radio value={false}>停用</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className={Style.item}>
                            <Button onClick={this.submit}>保存</Button>
                            <Button onClick={()=>{
                                this.props.history.go(-1);
                            }}>取消</Button>
                        </div>
                    </div>
                </Card>



            </div>
        )
    }
}
export default AddFeature;