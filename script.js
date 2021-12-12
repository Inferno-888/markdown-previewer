marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: placeholder
    }
    
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(event) {
    this.setState({text: event.target.value})
  }
  
  render() {
    return (
      <div id="section1">
        <div id="group1">
          <h1 className="label">Editor <i class="fa fa-solid fa-pen icon"></i></h1>
          <Editor onChange={this.handleChange} text={this.state.text} />
        </div>
        <div id="group2">
          <h1 className="label">Preview <i className="fa fa-brands fa-file icon"></i></h1>
          <Preview text={this.state.text} />
        </div>
      </div>
    )
  }
}

function Editor(props) {
  return (
    <textarea id="editor" onChange={props.onChange} value={props.text} type="text"></textarea>
  )
}

function Preview(props) {
  return (
    <div id="preview" dangerouslySetInnerHTML={{__html: marked(props.text, { renderer: renderer })}} />
  )
}

const placeholder = `# heading 1
## heading 2
### heading 3
#### heading 4
##### heading 5
###### heading 6
[link](https://google.com)
\`<div></div>\`
\`\`\`
function add(num1, num2) {
  return num1 + num2;
}
\`\`\`
* list item 1
* list item 2
* list item 3
- list item 4
    - list item 5
         - list item 6
> blockquote
![Tree](https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg)
**bolded text**`;

ReactDOM.render(<App />, document.getElementById("root"))
