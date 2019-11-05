import React from 'react'
import { Radio,Button} from 'antd';
import Style from './classfyadd.module.less'
class ClassifyAdd extends React.Component{
    state = {
        value: 1,
    };
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    render(){
        return(
            <div>
                <div>

                </div>
                <hr/>
                <div className={Style.formain}>
                    <div className={Style.formm}>
                        <label>分类名称:</label><input type="text" className={Style.inp} />
                        <br/>
                        <br/>
                        <label>分类封面图:</label><input type="text" className={Style.inp}/>
                        <br/>
                        <br/>
                        <label>分类名称:</label><input type="text" className={Style.inp}/>
                        <br/>
                        <br/>
                        <label>状态:</label>
                        <Radio.Group onChange={this.onChange} value={this.state.value}>
                            <Radio value={1}>A</Radio>
                            <Radio value={2}>B</Radio>
                        </Radio.Group>
                        <br/>
                        <br/>
                        <label>排序:</label><input type="text" className={Style.inp}/>
                        <br/>
                        <br/>
                        <Button className={Style.btn}>保存</Button><Button className={Style.btn}>取消</Button>
                    </div>
                </div>

            </div>
        )
    }
}
export default ClassifyAdd