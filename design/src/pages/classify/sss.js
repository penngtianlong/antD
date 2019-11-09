<label>分类名称:</label><input type="text" className={Style.inp}
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
<label>排序:</label><input type="text" className={Style.inp}
                         onChange={(e)=>{
                             this.setState({sort:e.target.value})
                         }}/>
<br/>
<br/>
