import axios from 'axios';
import {BACKEND_URL} from '../../backend_url';

export class NotificationHandler {
  userID: String;
  token: String;
  constructor(userID: String, token: String) {
    this.userID = userID;
    this.token = token;
  }
  async getAllNotification() {
    const {data} = await axios.get(
      `${BACKEND_URL}/notifications/${this.userID}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
    return data.notifications.notifications;
  }
}
