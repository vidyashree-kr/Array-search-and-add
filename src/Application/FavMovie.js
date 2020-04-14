import React from "react";

export default class FavMovie extends React.Component {
  constructor() {
    super();
    this.state = {
      movieName: null,
      movieRate: null,
      movieDuration: null,
      visibleButton: true,
      searched:false,
      data: [
        { name: "Avengers", ratings: "5", duration: "2:53:52" },
        { name: "Avatar", ratings: "5", duration: "2:53:52" },
        { name: "Action King", ratings: "5", duration: "2:02:12" },
        { name: "Wonder women", ratings: "4.5", duration: "01:03:01" },
        { name: "The Jungle Book", ratings: "3.6", duration: "2:53:08" },
        { name: "Warriors", ratings: "2.5", duration: "2:53:52" }
      ],
      filterText:0,
      searchData:[]
    };
  }
  handleSearch = e => {
    e.preventDefault();
    const filterText = e.target.value;
    if(this.state.movieName){
      this.setState({ movieDuration: null });
      this.setState({ movieRate: null });
      this.setState({ movieName: null });
      this.movieSearch(filterText);
    }
    else{
    this.setState({filterText})
    this.movieSearch(filterText);
    }
  };

  movieSearch = filterText => {
    const { data } = this.state;
    try{
    if (filterText.length >= 1) {
      const filterData = data.filter(movie => {
        const name = movie.name.toLowerCase();
        const ratings = movie.ratings.toLowerCase();
        const duration = movie.duration.toLowerCase();
        const filterValue = filterText.toLowerCase();
        return (
          name.startsWith(filterValue) ||
          ratings.startsWith(filterValue) ||
          duration.startsWith(filterValue)
        );
      });
      this.setState({ searchData: filterData });
      this.setState({searched:true})
    }
  } catch (e) {}
  };

  handleChange = e => {
    try {
      e.preventDefault();
      const {data}=this.state
      this.setState({ visibleButton: false });
      this.setState({ movieDuration: e.target.durationInput.value });
      this.setState({ movieRate: e.target.ratingsInput.value });
      this.setState({ movieName: e.target.nameInput.value });
      var obj = {};
      var Arr = [];
      const name = e.target.nameInput.value;
      const rate = e.target.ratingsInput.value;
      const duration = e.target.durationInput.value;
      obj["name"] = name;
      obj["ratings"] = rate;
      obj["duration"] = duration;
      Arr.push(obj);
      data.push(obj)
      this.setState({data:data})
    } catch (e) {}
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: 5, fontSize: 18, fontWeight: "bold" }}>
          {" "}
          Movie Name
        </div>
        <form onSubmit={e => this.handleChange(e)}>
          <div>
            <input
              type="text"
              name="nameInput"
              id="name-input"
              style={{ width: 250, height: 25, marginBottom: 20 }}
            ></input>
          </div>
          <div style={{ marginBottom: 5, fontSize: 18, fontWeight: "bold" }}>
            {" "}
            Ratings
          </div>
          <div>
            <input
              type="number"
              name="ratingsInput"
              id="ratings-input"
              style={{ width: 250, height: 25, marginBottom: 20 }}
            ></input>
          </div>
          <div style={{ marginBottom: 5, fontSize: 18, fontWeight: "bold" }}>
            {" "}
            Duration
          </div>
          <div>
            <input
              type="number"
              name="durationInput"
              id="duration-input"
              style={{ width: 250, height: 25, marginBottom: 20 }}
            ></input>
          </div>
          <div>
            <button
              id="submit-button"
              name="submitButton"
              disabled={!this.state.visibleButton}
              style={{ width: 70, height: 30, marginBottom: 20 }}
            >
              Submit
            </button>
          </div>
          <div style={{ marginBottom: 5, fontSize: 18, fontWeight: "bold" }}>
            {" "}
            Search
          </div>
        </form>
        <div>
          <input
            type="text"
            onChange={e => this.handleSearch(e)}
            name="searchInput"
            id="search-input"
            style={{ width: 250, height: 25, marginBottom: 20 }}
          ></input>
        </div>
        <div>
          {this.state.movieName || this.state.searched  ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Rating</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
              { this.state.searched && this.state.searchData.length===0 ? <div>No Data Found</div>:null}
                <tr>
                  
                  <td>{ !this.state.searched ? this.state.movieName : this.state.searched ? this.state.searchData.map(movie=>{
                    return(
                     <div>{movie.name}</div> 
                    )
                  }):null}</td>
                  <td>{!this.state.searched ? this.state.movieRate:  this.state.searched ?this.state.searchData.map(movie=>{
                    return(
                      <div>{movie.ratings}</div>
                    )
                  }):null}</td>
                  <td>{!this.state.searched ? this.state.movieDuration : this.state.searched ? this.state.searchData.map(movie=>{
                    return(
                      <div>{movie.duration}</div>
                    )
                  }):null}</td>
                </tr>
              </tbody>
            </table>
           ) : null} 
        </div>
      </div>
    );
  }
}
