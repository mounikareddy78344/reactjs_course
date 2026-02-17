import React from 'react'
import Newsitem from './Newsitem'

export default class News extends React.Component {

  constructor(props){
    super(props)
    console.log("hello i am a constructor from news component")
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  fetchNews = async (page = 1) => {
    this.setState({ loading: true });
    const pageSize = 20
    const toDate = new Date();
    const fromDate = new Date(toDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const fromDateStr = fromDate.toISOString().split('T')[0];
    
    const url = `https://newsapi.org/v2/everything?q=tesla&from=${fromDateStr}&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=70442fe3aec54043852b5299650a22f1`;

    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      console.log("API Response:", parsedData);
      console.log("Number of articles:", parsedData.articles ? parsedData.articles.length : 0);
      
      if (parsedData.articles && parsedData.articles.length > 0) {

        const articlesWithImages = parsedData.articles.filter(article => article.urlToImage);
        this.setState({ articles: articlesWithImages.length > 0 ? articlesWithImages : parsedData.articles, page, loading: false });
      } else {
        console.warn("No articles found in response");
        this.setState({ articles: [], page, loading: false });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      this.setState({ loading: false });
    }
  }

  componentDidMount(){
    this.fetchNews(1);
  }

  previousPage = async () => {
    const prevPage = Math.max(1, this.state.page - 1);
    await this.fetchNews(prevPage);
  }

  nextPage = async () => {
    const nextPage = this.state.page + 1;
    await this.fetchNews(nextPage);
  }

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center"> My News Top Headlines</h2>
        <div className="row">
          {this.state.articles.map(element => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem 
                  title={element.title ? element.title.slice(0, 45) : "No Title"} 
                  description={element.description ? element.description.slice(0, 100) : "No Description"}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
  />
              </div>
            )
          })}
        </div>
        <div className="d-flex justify-content-center gap-3 mt-5">
          <button disabled={this.state.page <= 1} type="button" onClick={this.previousPage} className="btn btn-dark">&larr; Previous</button>
          <button type="button" onClick={this.nextPage} className="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }
}