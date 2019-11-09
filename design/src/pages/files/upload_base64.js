import React,{Component} from 'react'
import { Card ,Button, message} from 'antd'

class FoodAdd extends Component{
    constructor(){
        super()
        this.state={
            img:''
        }
    }
    submit=()=>{
        let file=this.refs.file.files[0]
        var r = new FileReader();  //本地预览
        r.onload = ()=>{
            console.log(r.result);//图片的base64
            this.setState({img:r.result})
        }

        r.readAsDataURL(file);//本地预览对象进行读取
    }
    render(){

        return(
            <Card title=''>

                <span>缩略图:</span><input type="file" ref='file'/><br/>
                <img src={this.state.img} alt=""/>
                <Button type='primay' onClick={this.submit}>提交</Button>
            </Card>
        )
    }
}
export default  FoodAdd