import React ,{Component} from 'react'
import {Button,Input} from 'antd'
import Style from './brand.module.less'
class Brand extends Component{
    render(){
        return(
            <div className={Style.box}>
              <div className={Style.nav}>
                  <div className={Style.navtext}>进度查询条件:</div>
                  <div className={Style.navInput}>
                      <div className={Style.navIcon}>
                       <span>品牌名称:</span>
                          <Input type="text"/>
                      </div>
                      <div className={Style.navIcon}>
                          <span>品牌状态:</span>
                          <Input type="text"/>
                      </div>
                      <Button>查询</Button>
                  </div>
              </div>
                <div className={Style.main}>
                    <div className={Style.mainTop}><span>分类页表</span></div>
                    <div className={Style.mainMiddle}><ul>
                        <li>品牌ID</li>
                        <li>所属分类</li>
                        <li>品牌名称</li>
                        <li>品牌logn</li>
                        <li>排序</li>
                        <li>状态</li>
                        <li>操作</li>
                    </ul></div>
                    <div ><Button>新增品牌</Button></div>
                </div>
              <div className={Style.footer}>
                  <ul>
                      <li>1</li>
                      <li>行车用品</li>
                      <li>轮胎</li>
                      <li>排序</li>
                      <li>5</li>
                      <li>启用</li>
                      <li><Button size='small'>修改</Button><Button size='small'>删除</Button></li>
                  </ul>
                  <ul>
                      <li>2</li>
                      <li>行车用品</li>
                      <li>轮胎</li>
                      <li>排序</li>
                      <li>5</li>
                      <li>启用</li>
                      <li><Button size='small'>修改</Button><Button size='small'>删除</Button></li>
                  </ul>
                  <ul>
                      <li>3</li>
                      <li>行车用品</li>
                      <li>轮胎</li>
                      <li>排序</li>
                      <li>5</li>
                      <li>启用</li>
                      <li><Button size='small'>修改</Button><Button size='small'>删除</Button></li>
                  </ul>
                  <ul>
                      <li>4</li>
                      <li>行车用品</li>
                      <li>轮胎</li>
                      <li>排序</li>
                      <li>5</li>
                      <li>启用</li>
                      <li><Button size='small'>修改</Button><Button size='small'>删除</Button></li>
                  </ul>
              </div>
            </div>
        )
    }
}
export  default Brand