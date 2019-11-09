import React from 'react'
import { Radio,Button,message} from 'antd';
import Style from './classfyadd.module.less'
class ClassifyAdd extends React.Component{
    // state = {
    //     value: 1,
    // };
    constructor(){
        super()
        this.state={
            // value: 1,
            classifyName:'',
            img:'',
            sort:'',
            status:'true'
        }
    }
    onChange = e => {

        console.log('radio checked', e.target.value);
        this.setState({
            status: e.target.value,
        });
    };
    submit=()=>{
        let {classifyName,sort,status}=this.state
        if(status==0){
            status='false';
        }else {
            status='true';
        }
        let  imgs=this.refs.file.files[0]
        console.log(this,'hhaha')
        let File=new FileReader()
        File.onload = ()=>{
            console.log('读取结束')
            console.log(File.result)
            this.setState({img:File.result})
            // console.log(img,'sssss')
            this.$axios.post('/hehe/addClassifyNav',{classifyName,sort,status,img:this.state.img})
                .then((data)=>{
                    console.log('aaaaaaaaa',data)
                    if(data.data.code===1){
                        message.success('添加成功')
                    }
                })
        }
        File.readAsDataURL( imgs)
    }

    render(){
        return(
            <div>
                <div>

                </div>
                <hr/>
                <div className={Style.formain}>
                    <div className={Style.formm}>

                        <label>分类名称:</label><input type="text" className={Style.inp}
                                                   onChange={(e)=>{
                                                       this.setState({classifyName:e.target.value})
                                                   }}
                    />
                        <br/>
                        <br/>
                        {/*<form name="hehe" method="post" action="http://10.60.12.88:4000/file">*/}
                            <label>分类封面图:</label><input type="file" ref='file'  className={Style.inp}/>
                            <img src={this.state.img} alt=""/>
                        {/*</form>*/}

                        <br/>
                        <br/>
                        <label>状态:</label>
                        <Radio.Group onChange={this.onChange} value={this.state.status}>
                            <Radio value={0}>A</Radio>
                            <Radio value={1}>B</Radio>
                        </Radio.Group>
                        <br/>
                        <br/>
                        <label>排序:</label><input type="text" className={Style.inp}
                                                 onChange={(e)=>{
                                                     this.setState({sort:e.target.value})
                                                 }}/>
                        <br/>
                        <br/>
                        <Button className={Style.btn} onClick={this.submit}>保存</Button><Button className={Style.btn}>取消</Button>
                        {/*<Button className={Style.btn} onClick={this.submit1}>图片上传</Button>*/}
                        {/*<button type="submit">aaa</button>*/}
                    </div>
                </div>

            </div>
        )
    }
}
export default ClassifyAdd