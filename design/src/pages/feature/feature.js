import React, {Component, Fragment} from 'react';
import { Select,Input,Button,Popconfirm,Table } from 'antd';
import Style from './feature.module.less'
const { Option } = Select;

class Feature extends Component{
    columns = [
        {
            title: '特点ID',
            dataIndex: '_id',
            key: '_id',
            // render:()=>{
            //     var id=0;
            //     ++id;
            //     return(
            //         <div>
            //             {id}
            //         </div>
            //     )
            // }
        },
        {
            title: '所属分类',
            dataIndex: 'classifyName',
            key: 'classifyName',
        },
        {
            title: '所属品类',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: '特点名称',
            dataIndex: 'traitName',
            key: 'traitName',
        },
        {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render:(data)=>{
                if (data) {
                    return(
                        <div>启用</div>
                    )
                }else {
                    return(
                        <div>不启用</div>
                    )
                }
            }
        },
        {
            title: '操作',
            key: 'action',
            //不写dataIndex的时候获取的data就是表格的这一行的全部数据
            render: (data) => {
                // console.log('删除按钮',data,this)
                return (
                    <div>
                        <Popconfirm
                            title="你确定要删除吗？"
                            onConfirm={this.delItem.bind(this,data._id)}
                        >
                            <Button size='small'>删除</Button>
                        </Popconfirm>
                        {/* data是全部的数据 也就是将dataSource传了过去 */}
                        <Button size='small' onClick={this.updateItem.bind(this,data)}>修改</Button>

                    </div>
                )
            },
        }
    ];
    constructor(){
        super();
        this.state={
            classifyName:"",
            categoryName:"",
            traitName:"",
            status:"",
            classifyNav:[],
            categoryNav:[],
            featureState:[
                // {title:'不限',key:'zero'},
                {title:'启用',value:true,key:'one'},
                {title:'不启用',value:false,key:'two'},
            ],
            dataSource:[]

        }
    }
    componentDidMount(){
        this.getSelectList();
        this.getFeatureList();
    }
    //获取特点列表
    getFeatureList(classifyName,categoryName,status){
        this.$axios.post("http://10.60.12.88:8888/getTraitAll").then((data)=>{
            console.log("table",data);
            if (data.code === 1){
                this.setState({dataSource:data.data})
            }
        })
    }
    //获取查询条件中的一些数据
    getSelectList(){
        this.$axios.post("http://10.60.12.88:8888/getTraitData").then((data)=>{
            console.log("获取数据",data)
            if (data.code === 1) {
                this.setState({classifyNav:data.data.classifyNav,categoryNav:data.data.categoryNav})
                console.log(this.state.classifyNav,this.state.categoryNav)
            }
        })
    }
    //渲染select框
    renderSelect=(arr,caditon)=>{
        switch (caditon) {
            case "classifyName":
                console.log(arr)
                return (
                    <Select defaultValue="" style={{ width: 120 }} onChange={this.handleChange.bind(this,caditon)}>
                        {arr.map((item,index)=>(<Option key={index} value={item.classifyName}>{item.classifyName}</Option>))}
                    </Select>
                )
                break;
            case "categoryName":
                return (
                    <Select defaultValue="" style={{ width: 120 }} onChange={this.handleChange.bind(this,caditon)}>
                        {arr.map((item)=>(<Option key={item._id} value={item.categoryName}>{item.categoryName}</Option>))}
                    </Select>
                )
                break;
            case "status":
                return(
                    <Select defaultValue="" style={{ width: 120 }} onChange={this.handleChange.bind(this,caditon)}>
                        {arr.map((item)=>(<Option key={item.key} value={item.value}>{item.title}</Option>))}
                    </Select>
                )
                break;
        }

    }
    //查询条件
    handleChange=(caditon,value)=>{
        console.log("caditon",caditon);
        console.log("value",value);
        switch (caditon) {
            case "classifyName":
                this.setState({classifyName:value});
                break;
            case "categoryName":
                this.setState({categoryName:value});
                break;
            case "status":
                this.setState({status:value});
                break;
        }
        // return value;
    }
    //提交查询条件
    submit=()=>{
        //
        let {classifyName,categoryName,traitName,status} = this.state;
        console.log("查询条件为",classifyName,categoryName,traitName,status)
    }
    //删除
    delItem(id){

    }
    updateItem(data){

    }
    render(){
        let {classifyNav,categoryNav,featureState,dataSource} = this.state;
        return(
            <div className={Style.page}>
                <div className={Style.selectCondition}>
                    <div className={Style.selectTitle}>请输入查询条件：</div>
                    <div className={Style.wrap}>
                        <div className={Style.flexSelectBox}>
                            <div className={Style.selectItem}>
                                <label className={Style.labelName}>所属分类：</label>
                                {this.renderSelect(classifyNav,"classifyName")}
                            </div>
                            <div className={Style.selectItem}>
                                <label className={Style.labelName}>所属品类：</label>
                                {this.renderSelect(categoryNav,"categoryName")}
                            </div>
                            <div className={Style.selectItem}>
                                <label className={Style.labelName}>特点名称：</label>
                                <div className={Style.nameInput}><Input placeholder="特点名称" value={this.state.mFeatureName} onChange={(e)=>{this.setState({mFeatureName:e.target.value});{/*console.log(this.state.mFeatureName)*/}}} /></div>
                            </div>
                            <div className={Style.selectItem}>
                                <label className={Style.labelName}>特点状态：</label>
                                {this.renderSelect(featureState,"status")}
                            </div>
                        </div>
                        <Button className={Style.searchBtn} shape="circle" icon="search" onClick={this.submit}/>
                    </div>

                </div>
                <div className={Style.tableName}>
                    <span>特点列表</span>
                    <Button type="primary">添加特点</Button>
                </div>
                <Table dataSource={dataSource} pagination={false} columns={this.columns} ></Table>


            </div>
        )
    }
}
export default Feature;