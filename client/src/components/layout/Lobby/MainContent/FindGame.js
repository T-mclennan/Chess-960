import React, { Component } from "react";
import GameTable from "./GameTable";
import { connect } from "react-redux";
import "../../css/lobby.css";
export class FindGame extends Component {
  render() {
    return (
      <div className="main container outer">
        <h3>Click on a game below to join:</h3>
        {/* <hr /> */}
        <GameTable className="gameTable" />
      </div>

      // const TOTAL_PER_PAGE = 10;

      // class Users extends React.Component {
      //   constructor(props) {
      //     super(props);

      //     this.state = {
      //       users: [],
      //       page: 0,
      //       totalPages: 0,
      //     };
      //     this.incrementPage = this.incrementPage.bind(this);
      //     this.decrementPage = this.decrementPage.bind(this);
      //     this.setPage = this.setPage.bind(this);
      //     this.handleDelete = this.handleDelete.bind(this);
      //   }

      //   componentDidMount() {
      //     this.getUsers();
      //   }

      //   componentWillReceiveProps({ location = {} }) {
      //     if (location.pathname === '/users' && location.pathname !== this.props.location.pathname) {
      //       this.getUsers();
      //     }
      //   }

      //   getUsers() {
      //     get('/api/users')
      //       .then(({ data }) => {
      //         const { users } = data;
      //         const totalPages = Math.ceil(users.length / TOTAL_PER_PAGE);

      //         this.setState({
      //           users: data.users,
      //           page: 0,
      //           totalPages,
      //         });
      //       });
      //   }

      //   setPage(page) {
      //     return () => {
      //       this.setState({ page });
      //     };
      //   }

      //   decrementPage() {
      //     const { page } = this.state;

      //     this.setState({ page: page - 1 });
      //   }

      //   incrementPage() {
      //     const { page } = this.state;

      //     this.setState({ page: page + 1 });
      //   }

      //   handleDelete(userId) {
      //     const { users } = this.state;

      //     this.setState({
      //       users: users.filter(u => u.id !== userId),
      //     });
      //   }

      //   render() {
      //     const { users, page, totalPages } = this.state;
      //     const startIndex = page * TOTAL_PER_PAGE;

      //     return (
      //       <Page title="Users">
      //         <Helmet>
      //           <title>CMS | Users</title>
      //         </Helmet>

      //         <Table celled striped>
      //           <Table.Header>
      //             <Table.Row>
      //               <Table.HeaderCell>Name</Table.HeaderCell>
      //               <Table.HeaderCell>Email</Table.HeaderCell>
      //               <Table.HeaderCell>Phone</Table.HeaderCell>
      //               <Table.HeaderCell>Address</Table.HeaderCell>
      //               <Table.HeaderCell>City</Table.HeaderCell>
      //               <Table.HeaderCell>Zip Code</Table.HeaderCell>
      //             </Table.Row>
      //           </Table.Header>
      //           <Table.Body>
      //             {users.slice(startIndex, startIndex + TOTAL_PER_PAGE).map(user =>
      //               (<Table.Row key={user.id}>
      //                 <Table.Cell>{user.name}</Table.Cell>
      //                 <Table.Cell>{user.email}</Table.Cell>
      //                 <Table.Cell>{user.phone}</Table.Cell>
      //                 <Table.Cell>{user.address}</Table.Cell>
      //                 <Table.Cell>{user.city}</Table.Cell>
      //                 <Table.Cell>{user.zip}</Table.Cell>
      //               </Table.Row>),
      //             )}
      //           </Table.Body>
      //           <Table.Footer>
      //             <Table.Row>
      //               <Table.HeaderCell colSpan={6}>
      //                 <Menu floated="right" pagination>
      //                   {page !== 0 && <Menu.Item as="a" icon onClick={this.decrementPage}>
      //                     <Icon name="left chevron" />
      //                   </Menu.Item>}
      //                   {times(totalPages, n =>
      //                     (<Menu.Item as="a" key={n} active={n === page} onClick={this.setPage(n)}>
      //                       {n + 1}
      //                     </Menu.Item>),
      //                   )}
      //                   {page !== (totalPages - 1) && <Menu.Item as="a" icon onClick={this.incrementPage}>
      //                     <Icon name="right chevron" />
      //                   </Menu.Item>}
      //                 </Menu>
      //               </Table.HeaderCell>
      //             </Table.Row>
      //           </Table.Footer>
      //         </Table>
    );
  }
}

const TableStyle = {
  backGroundColor: "white",
  borderColor: "white",
  borderWidth: "1px"
};

const mapStateToProps = state => ({
  player: state.player.username
});

export default connect(mapStateToProps, {})(FindGame);
