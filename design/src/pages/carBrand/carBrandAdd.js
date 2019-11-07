import React ,{Component} from 'react'
import {Button,Input,Radio,message} from 'antd'
import Style from './carBrandAdd.module.less'
import {withRouter} from 'react-router-dom'
class carBrandAdd extends Component{
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
    //添加
    addClass=(state)=>{
        let {brandName,sort,status,img}=this.state

        this.$axios.post('http://10.60.12.88:8888/addBrandData',{brandName:brandName,sort:sort,status:status}).then((data)=>{
            // console.log(data)
            if(data.data.code==1){
                // console.log('aaa')
                  this.setState({brandName:'',img:'',sort:'',status:1})
                message.success("添加成功")
            }
        })


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
                         <Input type="text" value={this.state.img} onChange={(e)=>{
                             this.setState({img:e.target.value})
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
export default withRouter(carBrandAdd)