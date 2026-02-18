import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
        <div className="container my-3">
            
            <div className="card" style={{width: "18rem"}}>
        <img src={imageUrl || "https://via.placeholder.com/286x180?text=No+Image"} className="card-img-top" alt="News" style={{ height: "180px", objectFit: "cover" }} />
        <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href={newsUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More</a>
    </div>
    </div>
  </div>
        
    )
  }
}