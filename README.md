[README.md](https://github.com/user-attachments/files/31097643/README.md)
# مشروع CRUD - إدارة المنتجات

مشروع كامل يوضح عمليات **CRUD** (Create, Read, Update, Delete):
- **Backend حقيقي**: Node.js + Express، يخزّن البيانات في ملف `products.json`.
- **Frontend**: Vue 3 + Vite، يتواصل مع الباك اند عبر Axios.

## طريقة التشغيل

### 1. شغّل الباك اند
```bash
cd backend
npm install
npm start
```
السيرفر بيشتغل على: `http://localhost:3000`

### 2. شغّل الفرونت اند (في نافذة طرفية ثانية)
```bash
cd frontend
npm install
npm run dev
```
الموقع بيشتغل على: `http://localhost:5173`

## الـ API Endpoints

| Method | Endpoint              | الوصف            |
|--------|------------------------|-------------------|
| GET    | /api/products          | عرض كل المنتجات   |
| GET    | /api/products/:id      | عرض منتج واحد     |
| POST   | /api/products          | إضافة منتج جديد   |
| PUT    | /api/products/:id      | تعديل منتج        |
| DELETE | /api/products/:id      | حذف منتج          |

## هيكل المشروع

```
crud-project/
├── backend/
│   ├── server.js       # سيرفر Express وكل الـ routes
│   ├── products.json   # قاعدة البيانات (ملف JSON)
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.vue              # الصفحة الرئيسية
    │   ├── main.js
    │   ├── api.js                # دوال الاتصال بالباك اند
    │   └── components/
    │       ├── ProductForm.vue   # فورم الإضافة/التعديل
    │       └── ProductList.vue   # جدول عرض المنتجات
    ├── index.html
    └── package.json
```

## ملاحظات
- بيانات المنتجات تتحفظ فعليًا في `backend/products.json` (مش mock API مؤقت).
- تقدر تغيّر المورد من "منتجات" لأي شي ثاني (مستخدمين، مقالات...) بنفس الطريقة، بس تعدّل الحقول في `server.js` و `ProductForm.vue`.
