# 🛒 Online Store — 

> 

Una tienda online full-stack con panel de administración, construida con Node.js, Express, MongoDB y Pug. Sin JavaScript en el frontend. 

---

## 📁 Estructura del Proyecto

```
/
├── Backend/
│   └── src/                  # Panel de Administración (Paula's HQ)
│       ├── server.js
│       ├── config.js
│       ├── routes/
│       │   ├── adminRoutes.js
│       │   ├── productsRoutes.js
│       │   └── ordersRoutes.js
│       ├── controller/
│       │   ├── authController.js
│       │   ├── productsController.js
│       │   └── ordersController.js
│       ├── middleware/
│       │   ├── authSession.js
│       │   ├── session.js
│       │   └── verifyRole.js
│       ├── models/
│       │   ├── adminCollection.js
│       │   ├── productsCollection.js
│       │   └── ordersCollection.js
│       └── views/
│           └── admin/
│               ├── layout.pug
│               ├── login.pug
│               ├── dashboard.pug
│               ├── products.pug
│               └── editProduct.pug
│
├── Frontend/
│   └── src/                  # Tienda Online
│       ├── server.js
│       ├── config.js
│       ├── routes/
│       │   ├── productsRoutes.js
│       │   └── shopCartRoutes.js
│       ├── controllers/
│       │   ├── productsController.js
│       │   └── shopCarController.js
│       ├── models/
│       │   ├── productsCollection.js
│       │   └── ordersCollection.js
│       └── views/
│           ├── layout.pug
│           ├── index.pug
│           └── shopCart.pug
│
└── docker-compose.yml
```

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| Node.js + Express 5 | Servidor HTTP para backend y frontend |
| MongoDB + Mongoose | Base de datos NoSQL |
| Pug | Motor de plantillas (renderizado en servidor) |
| express-session + connect-mongo | Manejo de sesiones persistentes |
| bcrypt | Hash seguro de contraseñas |
| method-override | Soporte de PUT y DELETE desde formularios HTML |
| Docker + Docker Compose | Orquestación de contenedores |

---

## ⚙️ Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto (donde está `docker-compose.yml`) con las siguientes variables:

```env
# Puertos
PORT_BACKEND=3000
PORT_FRONTEND=4000

# Base de datos
DB_URI=mongodb://mongo:27017/penguin_store

# Seguridad
ADMIN_CODE=tu_codigo_secreto_para_crear_el_admin
SALT=10
SESSION_KEY=una_clave_secreta_muy_larga_y_segura
```

> ⚠️ **Nunca subas el `.env` a Git.** Está incluido en el `.dockerignore` y debe estar en el `.gitignore`.

---

## 🐳 Levantar el Proyecto con Docker (Recomendado)

### Requisitos previos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/online-store.git
   cd online-store
   ```

2. Crear el archivo `.env` en la raíz con las variables indicadas arriba.

3. Levantar todos los servicios:
   ```bash
   docker-compose up --build
   ```

4. Acceder a los servicios:
   - **Tienda Online:** http://localhost:4000/products
   - **Panel de Admin:** http://localhost:3000/auth/login

Para detener los contenedores:
```bash
docker-compose down
```

---

## 💻 Correr en Local (Sin Docker)

### Requisitos previos

- Node.js v18+
- MongoDB corriendo localmente (o una URI de MongoDB Atlas)

### Backend (Panel de Admin)

```bash
cd Backend/src
npm install
```

Crear un `.env` dentro de `Backend/src/`:
```env
PORT=3000
DB_URI=mongodb://localhost:27017/penguin_store
ADMIN_CODE=tu_codigo_secreto
SALT=10
SESSION_KEY=una_clave_secreta_muy_larga
```

```bash
npm run dev
```

El panel estará disponible en: http://localhost:3000/auth/login

### Frontend (Tienda Online)

```bash
cd Frontend/src
npm install
```

Crear un `.env` dentro de `Frontend/src/`:
```env
PORT=4000
DB_URI=mongodb://localhost:27017/online_store
```

```bash
npm run dev
```

La tienda estará disponible en: http://localhost:4000/products

---

## 🔐 Primer Login — Crear el Admin

La primera vez que uses el sistema, necesitás registrar a Paula como administradora.

Hacer un `POST` a `http://localhost:3000/auth/register` con el siguiente body (JSON o form-data):

```json
{
  "username": "paula",
  "email": "paula@antartica.com",
  "password": "tu_password",
  "code": "tu_codigo_secreto_del_env"
}
```

> Solo se puede registrar **un único admin**. Si ya existe uno, el endpoint lo rechaza.  
> Cualquier registro sin el `code` correcto crea un usuario con rol `user`.

Luego ir a http://localhost:3000/auth/login e iniciar sesión con las credenciales creadas.

---

## 🗺️ Rutas Disponibles

### Backend — Panel de Admin (`localhost:3000`)

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/auth/login` | Vista de login | ❌ |
| POST | `/auth/login` | Iniciar sesión | ❌ |
| POST | `/auth/register` | Registrar usuario/admin | ❌ |
| GET | `/auth/logout` | Cerrar sesión | ✅ |
| GET | `/api/orders` | Ver todos los pedidos | ✅ Admin |
| PUT | `/api/orders/:id/status` | Actualizar estado de pedido | ✅ Admin |
| GET | `/api/products` | Ver lista de productos | ✅ Admin |
| POST | `/api/products` | Crear producto | ✅ Admin |
| GET | `/api/products/edit/:id` | Vista de edición de producto | ✅ Admin |
| PUT | `/api/products/:id` | Actualizar producto | ✅ Admin |
| PATCH | `/api/products/:id/status` | Activar/desactivar producto | ✅ Admin |
| DELETE | `/api/products/:id` | Eliminar producto | ✅ Admin |

### Frontend — Tienda Online (`localhost:4000`)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/products` | Ver todos los productos activos |
| POST | `/shop-car` | Ver carrito con el producto seleccionado |
| POST | `/confirm-order` | Confirmar y guardar el pedido |

---

## 🐟 Funcionalidades

### Panel de Admin
- **Login seguro** con sesiones httpOnly y contraseñas hasheadas con bcrypt
- **CRUD completo de productos**: crear, editar, activar/desactivar y eliminar
- **Gestión de pedidos**: visualizar todos los pedidos y actualizar su estado (`new` → `preparing` → `on_the_way` → `delivered`)
- **Renderizado en servidor** con Pug

### Tienda Online
- **Catálogo de productos** con solo los productos activos
- **Carrito de compras** y formulario de pedido
- **Confirmación de orden** guardada en MongoDB con snapshot del producto
- **Cero JavaScript en el cliente** — renderizado 100% en servidor

---

## 🧊 Estados de los Pedidos

| Estado | Descripción |
|---|---|
| `new` | Pedido recién creado |
| `preparing` | En preparación |
| `on_the_way` | En camino |
| `delivered` | Entregado |

---

## 🐛 Troubleshooting

**El backend no conecta a MongoDB:**  
Verificá que `DB_URI` en el `.env` sea correcto y que MongoDB esté corriendo. Con Docker, asegurate de que el servicio `mongo` esté en la misma red (`app-network`).

**La sesión no persiste entre reinicios:**  
Las sesiones se guardan en MongoDB en la colección `sessions`. Si la DB se reinicia, las sesiones se pierden y hay que loguearse de nuevo.

**No puedo crear el admin:**  
Verificá que el `code` en el body del registro coincida exactamente con `ADMIN_CODE` en el `.env`. Si ya existe un admin en la DB, el endpoint lo rechaza.

---

