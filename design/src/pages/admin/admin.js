import React from 'react';
import {Layout,Menu,Icon,Dropdown,Button} from 'antd';
import {withRouter} from 'react-router-dom'
import CustomSlider from '../../components/customSlider/customSlider'
import Modal from '../../components/modal/modal'
import webStorage from '../../utils/webstorage'
const {Header,Content,Footer,Sider}=Layout;
class Admin extends React.Component{
    renderMenu=()=>{
        return(
            <Menu>
                <Menu.Item onClick={this.logout}>
                    <span>用户注销</span>
                </Menu.Item>
            </Menu>
        )

    }
    //安全退出
    logout=()=>{
        this.$axios.post('/hehe/outLogin').then((res)=>{
            if(res.code===1){
                // webStorage.setItem('token')='';
                localStorage.removeItem('uid')
                localStorage.removeItem('token')
                this.props.history.replace('/login')
            }
        })

    }
    render(){
        return(
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}
                >
                    <CustomSlider></CustomSlider>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }} >

                        <Dropdown overlay={this.renderMenu} placement="bottomLeft">
                            <Button>呵呵哒</Button>
                        </Dropdown>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>

                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
                <Modal></Modal>
            </Layout>
        )
    }
}
 export default withRouter(Admin)