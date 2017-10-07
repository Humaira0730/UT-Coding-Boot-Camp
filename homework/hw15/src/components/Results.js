import React from "react";

const Results = (props) => {
    const results = props.articles.map(a =>
        <div className="nyt-results" key={a.id}>
            <a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a>

            <form onSubmit={props.handleSave}>
                <button type="submit" className="btn waves-light teal lighten-2" title="Click to save this article."><i class="material-icons">add</i></button>
            </form>
        </div>
    );

    return (
        <div className="card blue-grey lighten-5">
            <div className="card-content">
                <div className="row">
                    <div className="col s10 offset-s1">
                        <h2 className="card-title">Results</h2>

                        {results}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;