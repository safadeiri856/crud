import axios from "axios";

const api = axios.create({
  baseURL: "https://crud-bwvx.onrender.com",
});

export default {
  getAll() {
    return api.get("/products");
  },
  create(product) {
    return api.post("/products", product);
  },
  update(id, product) {
    return api.put(`/products/${id}`, product);
  },
  remove(id) {
    return api.delete(`/products/${id}`);
  },
};
