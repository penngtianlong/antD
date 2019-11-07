
import React ,{Component} from 'react'
import {Button,Input,Radio} from 'antd'
import Style from './carBrandAdd.module.less'
import {withRouter} from 'react-router-dom'
class carBrandUpdate extends Component{
    constructor(){
        super();
        this.state={
            // value: 1,
            brandName:'', //品类名称
            img:"", //图片
            sort:'',//排序
            status:1,
            _id:''
        }
    }
    onChange  =(e) => {
        console.log(e.target.value)
        this.setState({
            status: e.target.value,

        });
    };

    //     修改
    upDataClass=(state)=>{
        let {brandName,sort,status,img,_id}=this.state
        console.log( status);
        this.$axios.post('http://10.60.12.88:8888/upDataBrandData',{brandName,sort,status,img,_id}).then((data)=>{
            // console.log(data)
            // console.log('修改成功')
            if(data.data.code==1){
                // console.log(status)
                  this.setState({brandName,sort,status,img,_id})
                this.props.history.push('/admin/brand')
            }
        })


    }
    componentDidMount(){
        let data=this.props.location.status

        if(data){
            console.log(data)

            let {brandName, sort,img,status,_id}=data;
            if(status==1){
                this.state.status=1
            }else if(status==2){
                this.state.status=2
            }
            this.setState({brandName, sort,img,status:this.state.status,_id})
        }

    }
    render(){
        return(
            <div className={Style.box}>
                <div className={Style.nav}>
                    <div >修改品类</div>
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
                        <Button onClick={this.upDataClass}>保存</Button>
                        <Button onClick={(e)=>{
                            this.props.history.go(-1)
                        }}>取消</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(carBrandUpdate)