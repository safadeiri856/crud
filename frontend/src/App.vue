<template>
  <main>
    <h1>🛒 مشروع CRUD - إدارة المنتجات</h1>
    

    <ProductForm :editing-product="editingProduct" @save="saveProduct" @cancel="cancelEdit" />

    <ProductList :products="products" @edit="startEdit" @delete="deleteProduct" />
  </main>
</template>

<script>
import ProductForm from "./components/ProductForm.vue";
import ProductList from "./components/ProductList.vue";
import api from "./api";

export default {
  name: "App",
  components: { ProductForm, ProductList },
  data() {
    return {
      products: [],
      editingProduct: null,
    };
  },
  created() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      const { data } = await api.getAll();
      this.products = data;
    },
    async saveProduct(product) {
      if (this.editingProduct) {
        await api.update(this.editingProduct.id, product);
        this.editingProduct = null;
      } else {
        await api.create(product);
      }
      await this.loadProducts();
    },
    startEdit(product) {
      this.editingProduct = product;
    },
    cancelEdit() {
      this.editingProduct = null;
    },
    async deleteProduct(id) {
      if (confirm("متأكد إنك تبي تحذف هذا المنتج؟")) {
        await api.remove(id);
        await this.loadProducts();
      }
    },
  },
};
</script>

<style>
body {
  font-family: "Segoe UI", Tahoma, sans-serif;
  background: #f9fafb;
  margin: 0;
  padding: 2rem;
}
main {
  max-width: 800px;
  margin: 0 auto;
}
h1 {
  margin-bottom: 0.25rem;
}
.hint {
  color: #6b7280;
  margin-top: 0;
  margin-bottom: 1.5rem;
}
</style>
