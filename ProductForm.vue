<template>
  <form class="product-form" @submit.prevent="submit">
    <h2>{{ isEditing ? "تعديل منتج" : "إضافة منتج جديد" }}</h2>

    <label>
      الاسم
      <input v-model="form.name" type="text" required />
    </label>

    <label>
      السعر
      <input v-model.number="form.price" type="number" min="0" required />
    </label>

    <label>
      الوصف
      <textarea v-model="form.description" rows="3"></textarea>
    </label>

    <div class="actions">
      <button type="submit">{{ isEditing ? "حفظ التعديل" : "إضافة" }}</button>
      <button v-if="isEditing" type="button" @click="$emit('cancel')">
        إلغاء
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ProductForm",
  props: {
    editingProduct: {
      type: Object,
      default: null,
    },
  },
  emits: ["save", "cancel"],
  data() {
    return {
      form: {
        name: "",
        price: 0,
        description: "",
      },
    };
  },
  computed: {
    isEditing() {
      return !!this.editingProduct;
    },
  },
  watch: {
    editingProduct: {
      immediate: true,
      handler(product) {
        this.form = product
          ? { ...product }
          : { name: "", price: 0, description: "" };
      },
    },
  },
  methods: {
    submit() {
      this.$emit("save", { ...this.form });
      if (!this.isEditing) {
        this.form = { name: "", price: 0, description: "" };
      }
    },
  },
};
</script>

<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 400px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}
label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
}
input,
textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
}
.actions {
  display: flex;
  gap: 0.5rem;
}
button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #2563eb;
  color: white;
}
button[type="button"] {
  background: #6b7280;
}
</style>
