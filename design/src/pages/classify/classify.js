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
        value: '启用',
        label: '启用',
    },
    {
        value: '停用',
        label: '停用',
    },
];

function onChange(value) {
    console.log(value);
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
            title: '状态',
            dataIndex: '__v',
            key: '__v',
            render(data) {
                console.log(data)
                let __v={'0':'停用','1':"启用"}
                return(
                    <span>{__v[data]}</span>
                )
            },
        },
        {
            title: '操作',
            key: 'action',
            render:(data)=>{
                console.log('删除按钮',data,this)
                return(
                    <div>
                        <Button size='small' onClick={this.delClassify.bind(this,data)}>删除</Button>|<Button size='small'>修改</Button>
                    </div>
                )
            },
        },
    ];
    constructor(){
        super()
        this.state={
            dataSource:[],
        }
    }
    componentDidMount(){

        this.getClassifyList()
    }
    getClassifyList=()=>{
        let cid
        console.log(this)
        this.$axios.post('http://10.60.12.88:8888/getClassifyNav')
            .then((res)=>{
                console.log(res)
                res.list.map((item,index)=>{
                    item.cid=index+1
                })
                if (res.code===1){
                    this.setState({dataSource:res.list})
                }
            })
    }
    delClassify=(_id)=>{
        console.log('删除'+_id)
        this.$axios.post('http://10.60.12.88:8888/delClassifyNav',{_id})
            .then((data)=>{
                if(data.code === 1){
                    message.success('删除成功')
                    // 请求最新数据刷新界面
                    this.getClassifyList()
                }
            })
    }
    // updateClassify=(data)=>{
    //     console.log('修改数据',data)
    //     this.data=data
    //     this.setState({updateShow:true})
    // }

    render(){
        let {dataSource}=this.state
        return(
            <div className={Style.classfify}>
                <div className={Style.search1}>
                    <span>请输入查询条件：</span>
                    <div className={Style.search}>
                        <span className={Style.word}>分类名称:</span><div className={Style.inp}><Input placeholder="分类名称" /></div>
                        <span className={Style.word}>分类状态:</span><div className={Style.inp}><Cascader options={options} onChange={onChange} placeholder="不限" /></div>
                        <div  className={Style.btn}><Button>查询</Button></div>
                    </div>
                </div>
                <Button onClick={()=>{
                    // this.props.history.push('/classifyadd')
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
export default Classify