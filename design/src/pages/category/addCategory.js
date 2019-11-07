import React from 'react'
import {Card,message,Button,Input,Radio} from 'antd'
import { Select } from 'antd';
import Style from './addCategory.module.less'
import {withRouter} from 'react-router-dom'
const { Option } = Select;

class addCategory extends React.Component{

    constructor(){
        super()
        this.state={
            select:[],
            classifyName:'',
            categoryName:'',
            img:'',
            sort:'',
            value: true,
        }
    }
    jump=(path)=>{
        this.props.history.push(path);
    }
    onChange = e => {
        // console.log('radio checked', e.target.value);
        this.state.value=e.target.value;
        this.setState({
            value: e.target.value,
        });
        console.log(this.state.value);
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
    cancel(){
        console.log('取消');
        // this.state.classifyName="";
        this.state.categoryName="";
        this.state.img="";
        this.state.sort="";
        this.state.value="";
        this.setState({categoryName:this.state.categoryName,img:this.state.img,
            sort:this.state.sort,value:this.state.value})

    }
    save(){
        let {classifyName,categoryName,sort,value}=this.state;
        this.$axios.post('http://10.60.12.88:8888/addCategoryNav',{classifyName:classifyName,categoryName:categoryName,
            sort:sort,status:value}).then((res)=>{
            if(res.data.code===1){
                message.success(res.data.message);
            }
        })

    }
    handleChange=(value)=> {
        this.state.classifyName=value;
        this.setState({classifyName:this.state.classifyName});
        console.log(this.state.classifyName);
    }
    render(){
        let {select,classifyName,categoryName,img,sort,value}=this.state;
        return(
           <div className={Style.main}>
               <div className={Style.header}><span className={Style.add}>这是新增品类页面</span>
                   <Button onClick={this.jump.bind(this,'/admin/category')}>返回</Button></div>
               {/*<hr/>*/}
               <Card className={Style.card}>
                   <div className={Style.content}>
                       <label className={Style.label}>所属分类：</label>
                       <Select defaultValue={this.state.start} style={{ width: 200 }} onChange={this.handleChange}>
                           {
                               select.map((item,index)=>{
                                   return(
                                       <Option value={item.classifyName} key={index}>{item.classifyName}</Option>
                                   )
                               })
                           }

                       </Select><br/><br/><br/>

                       <div>
                           <label className={Style.label}>品类名称：</label>
                           <Input style={{ width: 200 }} value={categoryName} onChange={(e)=>{
                               this.setState({categoryName:e.target.value})
                           }}/><br/><br/><br/>


                           <label className={Style.label}>品类封面图：</label>
                           <Input style={{ width: 200 }} value={img}/><br/><br/><br/>


                           <label className={Style.label}>排序：</label>
                           <Input style={{ width: 200 }} value={sort} onChange={(e)=>{
                               this.setState({sort:e.target.value})
                           }}/><br/><br/><br/>


                           <label className={Style.label}>状态：</label>
                               <Radio.Group onChange={this.onChange} value={this.state.value}>
                                   <Radio value={true}>启用</Radio>
                                   <Radio value={false}>停用</Radio>
                               </Radio.Group>
                           <br/><br/><br/>
                       </div>
                       <div className={Style.action}>
                        <Button className={Style.save} onClick={()=>{
                            this.save()
                        }
                        }>保存</Button><Button className={Style.cancel} onClick={()=>{
                            this.cancel()
                       }}>取消</Button>
                       </div>

                   </div>
               </Card>

           </div>
        )
    }
}
export default withRouter(addCategory)