import { Passwords } from "../components";
import config from "../conf/config";
import { Client, Databases, Account, ID } from "appwrite";

class Auth {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount(email, password) {
    try {
      const res = await this.account.create(ID.unique(), email, password);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async login(email, password) {
    try {
      const res = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async get() {
    try {
      const res = await this.account.get();
      return res;
    } catch (error) {
      return null;
    }
  }

  async logout() {
    try {
      const res = await this.account.deleteSessions();
    } catch (error) {
      return null;
    }
  }
}

const obj = new Auth();

export default obj;
