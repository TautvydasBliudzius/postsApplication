import "@babel/polyfill";
import axios from "axios";

const apiPlugin = (store) => {
  store.http = axios.create({ baseURL: SERVER_URL });

  store.getData = async function (url) {
    try {
      const response = await this.http.get(`${url}`);
      return response.data;
    } catch (error) {
      throw new Error("There was a problem fetching data from the server");
    }
  };
  store.postData = async function (url, payload) {
    try {
      const response = await this.http.post(url, payload);
      return response.data;
    } catch (error) {
      throw new Error("There was a problem patching data from the server");
    }
  };
  store.patchData = async function (url, payload) {
    try {
      const response = await this.http.patch(url, payload);
      return response.data;
    } catch (error) {
      throw new Error("There was a problem patching data from the server");
    }
  };
  store.deleteData = async function (url, id) {
    try {
      const response = await this.http.delete(`${url}`, `${id}`);
      return response;
    } catch (error) {
      throw new Error("There was a problem deleting data from the server")
    }
  }
};

export default apiPlugin;

