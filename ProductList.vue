<template>
  <div class="product-list">
    <h2>المنتجات ({{ products.length }})</h2>

    <p v-if="!products.length" class="empty">لا يوجد منتجات بعد.</p>

    <table v-else>
      <thead>
        <tr>
          <th>الاسم</th>
          <th>السعر</th>
          <th>الوصف</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.price }} $</td>
          <td>{{ product.description }}</td>
          <td class="row-actions">
            <button @click="$emit('edit', product)">تعديل</button>
            <button class="danger" @click="$emit('delete', product.id)">
              حذف
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  emits: ["edit", "delete"],
};
</script>

<style scoped>
.product-list {
  max-width: 700px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  text-align: right;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
.row-actions {
  display: flex;
  gap: 0.5rem;
}
button {
  cursor: pointer;
  padding: 0.3rem 0.7rem;
  border: none;
  border-radius: 4px;
  background: #2563eb;
  color: white;
}
button.danger {
  background: #dc2626;
}
.empty {
  color: #888;
}
</style>
