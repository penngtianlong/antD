import React from 'react'
import { Form, Icon, Input, Button, Checkbox,message,Card } from 'antd';
import webStorage from '../../utils/webstorage'
// antd 的form组件
import Style from './index.module.less'
class Login extends React.Component{

    submit=()=>{

        this.props.form.validateFields((err,userinfo)=>{
            // err验证是不是通过  通过 null
            if(err){
                message.error('信息输入有误请重试')
            }else{
                this.$axios.post('http://10.60.12.88:8888/userLogin',userinfo)
                    .then((res)=>{
                        console.log(res)
                        // return;
                        if(res.code===1){
                            // 存值

                            webStorage.setItem('uid',res.uid);

                            webStorage.setItem('token',res.token)


                            this.props.history.push('/admin/home')
                            // 跳转到首页
                        }else{

                        }

                    })
            }
        })


    }
    render(){
        const { getFieldDecorator } = this.props.form;
        //  getFieldDecorator  表单组件获取数据的方法 也是一个高阶
        return(
            <div className={Style.login}>
                <Card title='用户登录' className={Style.loginCard} >

                    <div className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                            <Button type="primary" onClick={this.submit} className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </div>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Login)