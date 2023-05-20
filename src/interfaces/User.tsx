import Spending from './Spending';

interface User {
  id: String;
  token: String;
  email?: String;
  name?: String;
  avatar?: String;
  spending?: [Spending];
}

export default User;
