import React from 'react';
import { AxiosResponse } from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { getAllMembers, getSingleMembers} from '../../services';
import './MemberListPage.css'


interface Andelan {
  login: string,
  id: number,
  text: string,

}
interface Member {
  login: string,
  name: string,
  bio: string,
  avatar_url: string,
  followers: number,
  following: number,
  public_repos: number,
  html_url: string,
  organizations_url: string
}

interface Props {
}

interface State {
  andelans: Array<Andelan>
  isOpen: Boolean
  member: Member
}


class MemberListPage extends React.Component<Props, State> {
  state: Readonly<State> = {
    andelans: [],
    isOpen: false,
    member: {
      login: '',
      name: '',
      bio: '',
      avatar_url: '',
      followers: 0,
      following: 0,
      public_repos: 0,
      html_url: '',
      organizations_url: ''
    }
  }

  componentDidMount() {
    getAllMembers().then((response: AxiosResponse<any>) => {
        const andelans = response.data
        this.setState({ andelans })
      })
  }

  handleClose = () => this.setState({ isOpen: false })

  getMember = (username: string) => {
    getSingleMembers(username).then((response) => {
        this.setState({ member: response.data })
        this.setState({ isOpen: !this.state.isOpen })
      })
  }

  render() {
    const { login, bio, name, avatar_url, followers, following, public_repos, html_url, organizations_url } = this.state.member;

    return (
      <div className="container">
        <h1 className='py-5'>{'Organizational Members'}</h1>
        <div className='row'>
          {this.state.andelans? this.state.andelans.map(item => {
            return (
              <div className="col-lg-3"
                key={item.id}
                onClick={() => this.getMember(item.login)}
              >
                <div className=' card-color'>
                  <p className="shadow px-5 text-center py-5 ">{item.login}</p>
                </div>
              </div>
            )
          }) : (<h2>Loading ...</h2>)
        }
        </div>
        <Modal show={this.state && this.state.isOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <img className="card-img-top" src={avatar_url} alt="avatar" />
              <div className="card-body">
                <h5 className="card-title">Username: {login}</h5>
                <p className="card-text">Bio: {bio}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Followers: {followers}</li>
                <li className="list-group-item">Following: {following}</li>
                <li className="list-group-item">Public Repos: {public_repos}</li>
              </ul>
              <div className="card-body" style={{flexDirection: 'row'}}>
                <div className='row'>
                <div className='col'><a href={html_url} className="card-link">View Profile</a></div>
                <div className='col text-right'><a href={organizations_url} className="card-link">My Organizations</a></div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-style" onClick={this.handleClose}>
              Close
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  };
}

export default MemberListPage;