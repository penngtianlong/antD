import React, {Component, Fragment} from 'react';
import { Card,Select,Input,Button,Popconfirm,Table,message } from 'antd';
import {withRouter} from 'react-router-dom'
import Style from './feature.module.less';
import FeatureUpdate from '../featureupdate/featureupdate'
const { Option } = Select;

class Feature extends Component{
    columns = [
        {
            title: '特点ID',
            dataIndex: '_id',
            key: '_id',
            // render:()=>{
            //     let id=0;
            //
            //     return(
            //         <div>
            //             {++id}
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
                console.log("renderstatus",data)
                if (data=="true") {
                    return(
                        <div>启用</div>
                    )
                }else {
                    return(
                        <div>停用</div>
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
                {title:'停用',value:false,key:'two'},
            ],
            dataSource:[],
            updateShow:false

        }
    }
    componentDidMount(){
        this.getSelectList();
        this.getFeatureList();
    }
    //获取特点列表
    getFeatureList(classifyName,categoryName,traitName,status){
        this.$axios.post("http://10.60.12.88:8888/getTraitAll",{classifyName,categoryName,traitName,status}).then((data)=>{
            // console.log("table",data);
            if (data.code === 1){
                this.setState({dataSource:data.data})
            }
        })
    }
    //获取查询条件中的一些数据
    getSelectList(){
        this.$axios.post("http://10.60.12.88:8888/getTraitData").then((data)=>{
            // console.log("获取数据",data)
            if (data.code === 1) {
                this.setState({classifyNav:data.data.classifyNav,categoryNav:data.data.categoryNav})
                // console.log(this.state.classifyNav,this.state.categoryNav)
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
        // console.log("caditon",caditon);
        // console.log("value",value);
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
        let statusString=status.toString();
        console.log("查询条件为",classifyName,categoryName,traitName,status)
        this.getFeatureList(classifyName,categoryName,traitName,statusString)
    }
    //删除
    delItem(id){
        // console.log('删除'+uid);
        this.$axios.post('http://10.60.12.88:8888/delTraitData',{_id:id})
            .then((data)=>{
                // console.log(data)
                if (data.code === 1) {
                    message.success(data.message)
                    //    请求最新数据刷新界面
                    this.getFeatureList()
                }
            })
    }
    //修改
    updateItem=(data)=>{
        // console.log('修改数据',data);
        this.data=data;
        this.setState({updateShow:true})
    }
    //关闭添加模态框
    cacelUpdate=(state)=>{
        if (state){//状态为一  是改变后关闭 则要重新请求数据 并关闭
            this.getFeatureList()
        }
        this.setState({updateShow:false})
    }
    //跳到添加
    jump=(path)=>{
        this.props.history.push(path)
    }
    render(){
        let {classifyNav,categoryNav,featureState,dataSource,updateShow} = this.state;
        let data=this.data;
        // console.log("aa",classifyNav)
        return(
            <div className={Style.page}>
                <Card>
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
                                    <div className={Style.nameInput}><Input placeholder="特点名称" value={this.state.traitName} onChange={(e)=>{this.setState({traitName:e.target.value});{/*console.log(this.state.mFeatureName)*/}}} /></div>
                                </div>
                                <div className={Style.selectItem}>
                                    <label className={Style.labelName}>特点状态：</label>
                                    {this.renderSelect(featureState,"status")}
                                </div>
                            </div>
                            <Button  type="primary" className={Style.searchBtn} shape="circle" icon="search" onClick={this.submit}/>
                        </div>

                </div>
                <hr/>
                <div className={Style.tableName}>
                    <span>特点列表</span>
                    <Button type="primary" onClick={()=>{
                        this.jump("/admin/addfeature")
                    }}>添加特点</Button>
                </div>


                    <Table dataSource={dataSource} pagination={true} columns={this.columns} ></Table>
                </Card>


                {!updateShow||<FeatureUpdate cacelUpdate={this.cacelUpdate} data={data} classifyName={data.classifyName} categoryName={data.categoryName} sort={data.sort} status={data.status==="false" ? false:true} traitName={data.traitName} classifyNav={classifyNav} categoryNav={categoryNav} featureState={featureState}></FeatureUpdate>}
            </div>
        )
    }
}
export default withRouter(Feature);