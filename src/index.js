import React from 'react'
import ReactDOM from 'react-dom'

const booklist = [
  {"title": "Tower Of God", "author":"SIU"},
  {"title": "God in Highschool", "author":"SIU", "pages":600},
  {"title": "Journal", "author":"SIU", "pages":30},
  {"title": "Chrimson King", "author":"IU", "pages":3}
]
const Book = ({title="no title provided",author="none",pages=0, freebookmark}) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>by: {author}</p>
      <p>Pages: {pages} pages</p>
      <p>Free Bookmark: {freebookmark ? 'yes!' : 'no!'}</p>
    </section>
  )
}

const Hiring = () =>
<div>
  <p>The library is hiring.....apparently.</p>
</div>

const NotHiring = () =>
<div>
  <p>The library is not hiring.</p>
</div>
class Library extends React.Component {
  static defaultProps={
    books: [
      {"title":"Tell tales", "author":"Chet whitey", "pages":1000}
    ]
  }
  state = {
    open: true,
    freebookmark :false,
    hiring: false,
    data : [],
    loading : false
  }
  componentDidMount() {
    this.setState({loading: true})
    fetch('https://hplussport.com/api/products/order/price/sort/asc/qty/1')
    .then(data => data.json())
    .then(data => this.setState({data, loading: false}))
  }

  componentDidUpdate() {
    console.log("The componet just updated")
  }
  toggleOpenClosed = () =>{
    this.setState(prevState => ({
      open:!prevState.open

    }))

  
  }
  render() {
    const {books}= this.props
  return (
    <div>
      {this.state.hiring ? <Hiring/> : <NotHiring />}
      {this.state.loading
      ? "loading..."
    :<div>
      {this.state.data.map(product => {
        return (
          <div>
            <h3>Library product of the week!</h3>
            <h4>{product.name}</h4>
            <img alt ={product.name} src={product.image} height ={100} />
            </div>
        )
      })}
      </div>
      }
      <h1>The library is {this.state.open ? 'open' : 'closed'}</h1>
      <button onClick ={this.toggleOpenClosed}>Change</button>
      {books.map(
        (book, i) =>
        <Book
        key ={i}
        title={book.title}
        author={book.author}
        pages={book.pages}
        freebookmark={this.state.freebookmark}/>
      )}
    </div>
  )
      }
}

class Favoritecolorform extends React.Component {
  state = {value : ''}
  newColor = e =>
  this.setState({value: e.target.value})
  submit =e => {
    console.log('New color: ${this.state.value}')
    e.preventDefault()
  }
  render() {
    return (
      <form onSubmit={this.submit}>
        <label>
          favorite color:
          <input 
          type="color"
          onChange={this.newColor} />
        </label>
        <button>Submit</button>
      </form>
    )
  }
}
ReactDOM.render(
  <Library books={booklist} />,

document.getElementById('root')
)