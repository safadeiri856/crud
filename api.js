import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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
