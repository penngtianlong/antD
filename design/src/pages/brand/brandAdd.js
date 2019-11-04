import React ,{Component} from 'react'
import {Button,Input} from 'antd'
import Style from './brandAdd.module.less'
class brandAdd extends Component{
    render(){
        return(
            <div className={Style.box}>
                <div className={Style.nav}>
                    <div >新增品类</div>
                    <div><Button>返回</Button></div>
                </div>
                <div className={Style.list}>
                    <div>
                        <span >所属分类:</span>
                        <Input type="text"/>
                    </div>
                    <div>
                        <span >品类名称:</span>
                        <Input type="text"/>
                    </div>
                    <div className={Style.img}>
                        <div className={Style.text}>品类封面图:</div>
                        <div className={Style.Sub}>
                         <Input type="text"/>
                            <Button>点击上传</Button>
                        </div>

                    </div>
                    <div className={Style.sort}>
                        <span >排序:</span>
                        <Input type="text" />
                    </div>
                    <div className={Style.sort}>
                        <span >启用:</span>
                        <Input type="text" />
                    </div>
                    <div className={Style.button}>
                       <Button>保存</Button>
                        <Button>取消</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default brandAdd