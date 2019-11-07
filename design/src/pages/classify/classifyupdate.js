import React from 'react'
import { Radio,Button,message} from 'antd';
import Style from './classfyadd.module.less'
import {withRouter} from 'react-router-dom'
class ClassifyUpdate extends React.Component{
    constructor(){
        super()
        this.state={
            classifyName:'',
            img:'',
            sort:'',
            status:'true',
            _id:''
        }
    }
    componentDidMount(){
        // console.log('呵呵',this)
        let data=this.props.location.state
        if(data){
            let {classifyName,img,sort,status,_id}=this.props.location.state
            if(status=="false"){
                status=0;
            }else {
                status=1;
            }
            console.log('333',classifyName,status,_id);
            this.setState({classifyName,img,sort,status,_id})
        }
  }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            status: e.target.value,
        });
    };
    submit=()=>{
        let {classifyName,sort,status,img,_id}=this.state
        if(status==0){
            status='false';
        }else {
            status='true';
        }
        console.log('777',status,_id)
        this.$axios.post('/hehe/upDataClassifyNav',{classifyName,sort,img,status,_id})
            .then((data)=>{
                console.log('修改',data)
                if(data.code===1){
                    message.success('修改成功')
                }
            })
    }

    render(){
        return(
            <div>
                <div>
                </div>
                <hr/>
                <div className={Style.formain}>
                    <div className={Style.formm}>
                        <label>分类名称:</label><input type="text" className={Style.inp} value={this.state.classifyName}
                         onChange={(e)=>{
                                  this.setState({classifyName:e.target.value})
                         }}
                    />
                        <br/>
                        <br/>
                        <label>分类封面图:</label><input type="text" className={Style.inp}/>
                        <br/>
                        <br/>
                        <label>状态:</label>
                        <Radio.Group onChange={this.onChange} value={this.state.status}>
                            <Radio value={0}>A</Radio>
                            <Radio value={1}>B</Radio>
                        </Radio.Group>
                        <br/>
                        <br/>
                        <label>排序:</label><input type="text" className={Style.inp} value={this.state.sort}
                                                 onChange={(e)=>{
                                                     this.setState({sort:e.target.value})
                                                 }}/>
                        <br/>
                        <br/>
                        <Button className={Style.btn} onClick={this.submit}>修改</Button>
                    </div>
                </div>

            </div>
        )
    }
}
export default withRouter(ClassifyUpdate)