     import React ,{Component} from 'react'
import {Button,Input,Radio,message} from 'antd'
import Style from './brandAdd.module.less'
import {withRouter} from 'react-router-dom'
class brandAdd extends Component{
    constructor(){
        super();
        this.state={
            // value: 1,
            brandName:'', //品类名称
            img:"", //图片
            sort:'',//排序
            status:1
        }
    }
    onChange  =(e) => {
        // console.log(e.target.value)
        this.setState({
            status: e.target.value,

        });
    };
    //添加addBrandData
    addClass=(state)=>{
        let {brandName,sort,status}=this.state
        let  imgs=this.refs.file.files[0]

        let File=new FileReader()
        File.onload = ()=>{
            console.log('读取结束')
            console.log(File.result)
            this.setState({img:File.result})
            // console.log(img,'sssss')
            this.$axios.post('/hehe/addBrandData',{brandName,sort,status,img:this.state.img})
                .then((data)=>{

                    if(data.data.code===1){
                        message.success('添加成功')
                    }
                })
        }
        File.readAsDataURL( imgs)
    }
    render(){
        return(
            <div className={Style.box}>
                <div className={Style.nav}>
                    <div >新增品类</div>
                    <div><Button onClick={()=>{
                        this.props.history.go(-1)
                    }}>返回</Button></div>
                </div>
                <div className={Style.list}>

                    <div>
                        <span >品牌名称:</span>
                        <Input type="text" value={this.state.brandName} onChange={(e)=>{
                            if(e.target.value==null)return
                            else{this.setState({brandName:e.target.value})}

                        }} />
                    </div>
                    <div className={Style.img}>
                        <div className={Style.text}>品类封面图:</div>
                        <div className={Style.Sub}>
                         <input className={Style.inp} type="file" ref='file'  onChange={(e)=>{

                         }} />
                            <Button>点击上传</Button>
                        </div>

                    </div>
                    <div className={Style.sort}>
                        <span >排序:</span>
                        <Input type="text" value={this.state.sort} onChange={(e)=>{
                            let values=e.target.value;
                            if(values.trim().match(/^\d+?$/g)){
                                this.setState({sort:e.target.value})
                            }
                        }} />
                    </div>
                    <div className={Style.fouce}>
                        <div >启用:</div>
                        <div className={Style.checkbox}>
                            <Radio.Group onChange={this.onChange} value={this.state.status}>
                                <Radio value={2}>开</Radio>
                                <Radio value={1}>关</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className={Style.button}>
                       <Button onClick={this.addClass}>保存</Button>
                        <Button>取消</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(brandAdd)