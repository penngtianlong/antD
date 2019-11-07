import React from 'react'
import {Card,message,Button,Input,Radio} from 'antd'
import { Select } from 'antd';
import Style1 from './addCategory.module.less'
import {withRouter} from 'react-router-dom'
import Style from './updateCategory.module.less'
const { Option } = Select;

class updateCategory extends React.Component{

    constructor(props){
        super()
        this.state={
            select:[],
            // data:props.data
            _id:props.data._id,
            classifyName:props.data.classifyName,
            categoryName:props.data.categoryName,
            img:props.data.img,
            sort:props.data.sort,
            status: props.data.status
        }
    }
    jump=(path)=>{
        this.props.history.push(path);
    }


    //判断状态
    onChange = e => {
        this.state.status=e.target.value;
        this.setState({
            status: this.state.status
        });
    };



    componentDidMount(){
        this.$axios.post('http://10.60.12.88:8888/getClassifyNav').then((res)=>{
            // console.log(res);
            if(res.code===1){
                this.state.select=res.list;
                this.setState({select:this.state.select})

            }
        })
    }
    //修改信息
    update=()=>{
        let {_id,classifyName,categoryName,img,sort,status}=this.state;
        let sendStatus=status==='启用' ? 'true':'false';
        this.$axios.post('http://10.60.12.88:8888/upDataCategoryNav',{_id,classifyName,categoryName,sort,status:sendStatus}).then((res)=>{
            console.log(res);
            if(res.data.code==1){
                message.success('修改成功');
                this.props.cacelUpdate(1);
            }
        })








    }

    //修改分类名
    handleChange=(value)=> {
        this.state.classifyName=value;
        this.setState({classifyName:this.state.classifyName});
        // console.log(this.state.classifyName);
    }


    render(){
        let {select,classifyName,categoryName,img,sort,status}=this.state;
        return(
            <div className={Style.upDate}>
                <div className={Style1.header}><span className={Style1.add}>这是新增品类页面</span>
                    <Button onClick={this.jump.bind(this,'/admin/category')}>返回</Button></div>

                <Card className={Style1.card}>
                    <div className={Style1.content}>
                        <label className={Style1.label}>所属分类：</label>
                        <Select defaultValue={classifyName} style={{ width: 200 }} onChange={this.handleChange}>
                            {
                                select.map((item,index)=>{
                                    return(
                                        <Option value={item.classifyName} key={index}>{item.classifyName}</Option>
                                    )
                                })
                            }

                        </Select><br/><br/><br/>

                        <div>
                            <label className={Style1.label}>品类名称：</label>
                            <Input style={{ width: 200 }} value={categoryName} onChange={(e)=>{
                                this.setState({categoryName:e.target.value})
                            }}/><br/><br/><br/>


                            <label className={Style1.label}>品类封面图：</label>
                            <Input style={{ width: 200 }} value={img}/><br/><br/><br/>


                            <label className={Style1.label}>排序：</label>
                            <Input style={{ width: 200 }} value={sort} onChange={(e)=>{
                                this.setState({sort:e.target.value})
                            }}/><br/><br/><br/>


                            <label className={Style1.label}>状态：</label>
                            <Radio.Group onChange={this.onChange} value={status}>
                                <Radio value={'启用'}>启用</Radio>
                                <Radio value={'停用'}>停用</Radio>
                            </Radio.Group>
                            <br/><br/><br/>
                        </div>
                        <div className={Style1.action}>
                            <Button className={Style1.save} onClick={()=>{
                                this.update()
                            }
                            }>修改</Button><Button className={Style1.cancel} onClick={()=>{
                            this.props.cacelUpdate(0)
                        }}>取消</Button>s
                        </div>

                    </div>
                </Card>

            </div>
        )
    }
}
export default withRouter(updateCategory)