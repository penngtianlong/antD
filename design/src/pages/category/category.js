import React from 'react'
import {Card,message,Button,Table,Popconfirm} from 'antd'
import {withRouter} from 'react-router-dom'
import Style from './category.module.less'
import { Select,Input } from 'antd';
import UpdateCategory from './updateCategory'
const { Option } = Select;

class Category extends React.Component{
    columns = [
        {
            title: '品类ID',
            dataIndex: '_id',
            key: 'name',
        },
        {
            title: '所属分类',
            dataIndex: 'classifyName',
            key: 'classifyName',
        },
        {
            title: '品类名称',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: '封面图',
            dataIndex: 'img',
            key: 'img',
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
        },
        {
            title: '操作',
            render:(data)=>{
                return(
                    <div>
                        <Popconfirm
                            title="你确定要删除吗？"
                            onConfirm={this.delRoot.bind(this,data._id)}
                        >
                            <Button size='small'>删除</Button>
                        </Popconfirm>
                        <Button size='small' onClick={this.updateRoot.bind(this,data)}>修改</Button>
                    </div>
                )
            }
        },

    ];


    //获取查询的下拉数据
    handleChange1=(value)=> {
        // console.log(value);
        this.state.classifyName=value;
        this.setState({classifyName:this.state.classifyName})
        // console.log(this.state.classifyName,'查询分类');
    }
    handleChange2=(value)=> {
        this.state.status=value;
        this.setState({status:this.state.status})
        // console.log(this.state.status,'查询品类');
    }


    //删除数据
    delRoot=(uid)=>{
        console.log('删除'+uid)
        this.$axios.post('http://10.60.12.88:8888/delCategoryNav',{_id:uid}).then((res)=>{
            // console.log(res);
            if(res.code===1){
                message.success('删除成功')
                this.getRootList();
            }
        })

    }

    //修改数据
    updateRoot=(data)=>{
        // console.log('修改数据',data)
        this.data=data;
        this.setState({updateShow:true})

    }



    //取消
    cacelUpdate=(state)=>{
        if(state){
            this.getRootList();
            this.setState({updateShow:false})
        }else{
            this.setState({updateShow:false})
        }
    }


    constructor(){
        super()
        this.state={
            select:[],
            classifyName:'',
            categoryName:'',
            img:'',
            sort:'',
            status:'不限',
            dataSource:[],
            updateShow:false
        }
    }
    componentDidMount(){
        //获取分类信息
        this.$axios.post('http://10.60.12.88:8888/getClassifyNav').then((res)=>{
            if(res.code===1){
                this.state.select=res.list;
                this.setState({select:this.state.select})

            }

        })
        //获取品类信息
        this.getRootList()


    }
    //获取品类信息
    getRootList=()=>{
        this.$axios.post('http://10.60.12.88:8888/getCategoryNav').then((res)=>{
            console.log(res,'品类信息');
            if(res.code===1){
                this.state.dataSource=res.list;
                for(let i=0;i<this.state.dataSource.length;i++){
                    if(this.state.dataSource[i].status=="true"){
                        this.state.dataSource[i].status='启用'
                    }else{
                        this.state.dataSource[i].status='停用'
                    }
                }
                this.setState({dataSource:this.state.dataSource});

            }

        })
    }
    //查询
    query=()=>{
        console.log(this.state.classifyName);
        console.log(this.state.categoryName);
        // console.log(this.state.status);
        var status;
        if(this.state.status==='不限'){
            status='';
        }else if(this.state.status==='启用'){
            status='true';
        }else if(this.state.status==='停用'){
            status='false';
        }
        console.log(status)
        let {classifyName,categoryName}=this.state;
        this.$axios.post('http://10.60.12.88:8888/getCategoryNav',{classifyName,categoryName,status:status}).then((res)=>{
            console.log(res);
            if(res.code===1){
                this.state.dataSource=res.list;
                for(let i=0;i<this.state.dataSource.length;i++){
                    if(this.state.dataSource[i].status=="true"){
                        this.state.dataSource[i].status='启用'
                    }else{
                        this.state.dataSource[i].status='停用'
                    }
                }
                this.setState({dataSource:this.state.dataSource});
            }
        })

    }

    jump=(path)=>{
        this.props.history.push(path)
    }
    render(){
        let {select,updateShow}=this.state;
        let data=this.data;
        return(
            <div className={Style.main}>
                <div className={Style.header}>
                    <span className={Style.tiaojian}>请输入查询条件:</span>
                    <Button onClick={this.jump.bind(this,'/admin/addCategory')}>新增品类</Button>
                </div>
                {/*<hr/>*/}
                <Card className={Style.card}>
                    <label>所属分类：</label>
                    <Select style={{ width: 140 }} onChange={this.handleChange1.bind(this)}>
                        {
                            select.map((item,index)=>{
                                return(
                                    <Option value={item.classifyName} key={index}>{item.classifyName}</Option>
                                )
                            })
                        }
                    </Select>&emsp;&emsp;&emsp;

                    <label>品类名称：</label>
                    <Input type="text" style={{ width: 140 }} onChange={(e)=>{
                        this.setState({categoryName:e.target.value})
                    }}/>&emsp;&emsp;&emsp;

                    <label>品类状态：</label>
                    <Select  style={{ width: 140 }} onChange={this.handleChange2.bind(this)}>
                        <Option value="不限">不限</Option>
                        <Option value="启用">启用</Option>
                        <Option value="停用">停用</Option>
                    </Select>&emsp;&emsp;&emsp;

                    <Button className={Style.save} onClick={()=>{
                        this.query()
                    }
                    }>查询</Button>
                    <hr/>



                    {/*品类列表*/}
                    <span>品类列表</span>
                    <Table dataSource={this.state.dataSource} columns={this.columns} />;
                </Card>

                {!updateShow||<UpdateCategory cacelUpdate={this.cacelUpdate} data={data}></UpdateCategory>}
            </div>
        )
    }
}
export default withRouter(Category)