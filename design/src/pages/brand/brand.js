import React ,{Component} from 'react'

import {Card,Table, message,Pagination,Spin, Popconfirm,Button,Input, Cascader} from 'antd'
import {withRouter} from 'react-router-dom'
import Style from './brand.module.less'
const options = [
    {
        value: '1',
        label: '停用',

    },
    {
        value: '2',
        label: '启用',
    },
    {
        value: '1||2',
        label: '不限',

    }
];
// function onChange(value) {
//     console.log(value);
//     this.state.status=value;
//     console.log(this.state.status)
// }
function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
}

function cancel(e) {
    console.log(e);
    message.error('Click on No');
}

class Brand extends Component{
     columns = [
        {
            title: '品牌ID',
            dataIndex: 'cid',
            key: 'cid',
        },
        {
            title: '品牌名称',
            dataIndex: 'brandName',
            key: 'brandName',
        },
        {
            title: '封面图',
            dataIndex: 'img',
            key: 'img',
            render:(data)=>{
                return(
                    <img src={data} className={Style.img}/>
                )
            }
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
                // console.log(data)
                let status={"1":'停用','2':"启用"}
                return(
                    <span>{status[data]}</span>
                )
            },
        },
        {
            title: '操作',
            key: 'action',
            render:(data)=>{
                // console.log('删除按钮',data,this)
                return(
                    <div>
                        <Popconfirm   onConfirm={this.delBrand.bind(this,data) }>
                        <Button size='small'  >删除</Button>
                        </Popconfirm>
                            |<Button size='small'onClick={(e)=>{
                            this.props.history.push({pathname:'/admin/brandUpdate',status:data})
                    }}>修改</Button>
                    </div>
                )
            }
        }
    ]
    constructor(){
        super()
        this.state={

            dataSource:[],
            brandName:'',
            status:0,


        }
    }
    componentDidMount(){
      this.getList()
    }
// 获取列表
    getList=()=>{
        this.$axios.post('http://10.60.12.88:8888/getBrandData').then((data)=>{
        // console.log(data)

         if(data.code==1){
                data.list.map((item,index)=>{
                    item.cid=index+1
                })
             this.setState({dataSource:data.list})
         }
        })
    }
    //删除
    delBrand=(data)=>{

       let _id=data._id
        this.$axios.post('http://10.60.12.88:8888/delBrandData',{_id:_id}).then((data)=>{
            if(data.code==1){
                message.success('删除成功')
                this.getList()
            }
        })
    };


    //查询
    getInfo=(data)=>{
    let {brandName,status} =this.state
       console.log( status[0])

        this.$axios.post('http://10.60.12.88:8888/getBrandData',{brandName,status:status[0]}).then(
            (data)=>{
                if(data.code==1){
                    message.success("查询成功")
                    this.setState({dataSource:data.list})
                }

            }
        )




    }
    render(){

        return(
            <div className={Style.box}>
              <div className={Style.nav}>
                  <div className={Style.navtext}>进度查询条件:</div>
                  <div className={Style.navInput}>
                      <div className={Style.navIcon}>
                       <span>品牌名称:</span>
                          <Input type="text" value={this.state.brandName} onChange={(e)=>{

                                  this.setState({brandName:e.target.value})


                          }} />
                      </div>
                      <div className={Style.navIcon}>
                          <span>品牌状态:</span>
                          <span className={Style.Cascader}><Cascader options={options}  placeholder="不限"  onChange={(value)=>{
                             this.setState({status:value})
                          }}/></span>

                      </div>
                      <Button onClick={this.getInfo.bind(this)}>查询</Button>
                  </div>
              </div>
                <div className={Style.main}>
                    <Card title='分类列表'>
                        <Button onClick={()=>{
                            this.props.history.push('/admin/brandAdd')
                        }}>新增品牌</Button>
                     <Table dataSource={this.state.dataSource} columns={this.columns} >;
                     </Table>

                    </Card>

                </div>
            </div>
        )
    }
}
export  default withRouter(Brand)