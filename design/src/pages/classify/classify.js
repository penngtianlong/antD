// import {Card,Table,Button} from 'antd'
import {Card,Table, message,Pagination,Spin, Popconfirm,Button,Input, Cascader} from 'antd'
import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from '../../utils/axios'
import Style from './classify.module.less'

/*
1,查看所有管理员信息
a.请求数据
b.显示数据
2.删除管理员
3.修改管理员权限
*/
const options = [
    {
        value: '不限',
        label: '不限',
    },
    {
        value: 'true',
        label: '启用',
    },
    {
        value: 'false',
        label: '停用',
    },
];
function onChange(value){
    return value
}
class Classify extends React.Component{

    columns = [
        {
            title: '分类ID',
            dataIndex: 'cid',
            key: 'cid',
        },
        {
            title: '分类名称',
            dataIndex: 'classifyName',
            key: 'classifyName',
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
            //__v
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render(data) {
                let status={'false':'停用','true':"启用"}
                return(
                    <span>{status[data]}</span>
                )
            },
        },
        {
            title: '操作',
            key: 'action',
            render:(data)=>{
                return(
                    <div>
                        <Button size='small' onClick={this.delClassify.bind(this,data)}>删除</Button>|<Button size='small' onClick={()=>{
                        this.props.history.push({pathname:'/admin/classifyupdate',state:data})
                    }}>修改</Button>
                    </div>
                )
            },
        },
    ];
    constructor(){
        super()
        this.state={
            dataSource:[],
            classifyName:''
        }
    }
    componentDidMount(){
        this.getClassifyList()
    }
    selClassify=()=>{
       let {classifyName,status}=this.state
        this.$axios.post('/hehe/getClassifyNav',{classifyName,status})
            .then((res)=>{
                // console.log('hahahahahaaha',res)
                res.list.map((item,index)=>{
                    item.cid=index+1
                })
                if (res.code===1){
                    this.setState({dataSource:res.list})
                }
            })
    }
    getClassifyList=()=>{
        let cid
        this.$axios.post('/hehe/getClassifyNav')
            .then((res)=>{
                res.list.map((item,index)=>{
                    item.cid=index+1
                })
                if (res.code===1){
                    this.setState({dataSource:res.list})
                }
            })
    }
    delClassify=(_id)=>{
        this.$axios.post('/hehe/delClassifyNav',{_id})
            .then((data)=>{
                if(data.code === 1){
                    message.success('删除成功')
                    // 请求最新数据刷新界面
                    this.getClassifyList()
                }
            })
    }

    render(){
        let {dataSource,classifyName,status}=this.state
        return(
            <div className={Style.classfify}>
                <div className={Style.search1}>
                    <span className={Style.putin}>请输入查询条件：</span>
                    <div className={Style.search}>
                        <span className={Style.word}>分类名称:</span><div className={Style.inp}><Input placeholder="分类名称" value={classifyName} onChange={(e)=>{
                        this.setState({classifyName:e.target.value})
                    }}/></div>
                        <span className={Style.word}>分类状态:</span><div className={Style.inp}><Cascader options={options}  placeholder="不限" onChange={(value)=>{
                        this.setState({status:value})
                    }} /></div>
                        <div  className={Style.btn}><Button onClick={this.selClassify}>查询</Button></div>
                    </div>
                </div>
                <Button className={Style.newadd} onClick={()=>{
                    // console.log(this)
                    this.props.history.push('/admin/classifyadd')
                    // alert('跳转到新增分类')
                }}>新增分类</Button>
                <Card title='分类列表'>
                    <Table
                        pagination={false}
                        dataSource={dataSource}
                        columns={this.columns}>
                    </Table>
                </Card>
            </div>
        )
    }
}
// export default connect(state=>state)(withRouter(App))
export default withRouter(Classify)