```markdown
# 🚀 test-job-express REST API

## 📡 Базовый URL
```

http://localhost:4200/api

````

#### 1. Регистрация пользователя
```http
POST /auth/register
````

**Тело запроса:**

```json
{
	"name": "Ivan",
	"bio": "Ivan Ivan Ivan",
	"dateOfBirth": "2024-12-24T06:22:33.444Z",
	"email": "t@t.ru",
	"password": "12345678",
	"role": "ADMIN",
	"userStatus": true
}
```

**Пример curl:**

```bash
curl -X POST http://localhost:4200/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ivan",
    "bio": "Ivan Ivan Ivan",
    "dateOfBirth": "2024-12-24T06:22:33.444Z",
    "email": "t@t.ru",
    "password": "12345678",
    "role": "ADMIN",
    "userStatus": true
  }'
```

**Успешный ответ (201):**

```json
{
	"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsInJvbGUiOiJBRE1JTiIsInVzZXJTdGF0dXMiOnRydWUsImlhdCI6MTc2OTQ5NjE2OSwiZXhwIjoxNzY5NDk5NzY5fQ.zqVe4A1QsGsVyO0i29TL8T6XPdto8fVmfAqsjaecxMU",
	"messageSuccess": "Пользователь успешно создана"
}
```

#### 2. Вход в систему

```http
POST /auth/login
```

**Тело запроса:**

```json
{
	"email": "t@t.ru",
	"password": "12345678"
}
```

**Пример curl:**

```bash
curl -X POST http://localhost:4200/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "t@t.ru",
    "password": "12345678"
  }'
```

**Успешный ответ (200):**

```json
{
	"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsInJvbGUiOiJBRE1JTiIsInVzZXJTdGF0dXMiOnRydWUsImlhdCI6MTc2OTQ5NjM0NiwiZXhwIjoxNzY5NDk5OTQ2fQ.V1ebz9O671IRIFYQRi76A1q0c5ksO79SwJj1Olbq0Vo",
	"messageSuccess": "Вы успешно вошли в систему"
}
```

### 👥 Пользователи (требуется JWT токен)

#### 3. Получить одного пользователя

```http
GET /users/:userId
```

**Заголовок:**

```
Authorization: Bearer <jwt_token>
```

**Пример curl:**

```bash
curl -X GET http://localhost:4200/api/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Успешный ответ (200):**

```json
{
	"user": {
		"id": 44,
		"name": "Ivan",
		"bio": "Ivan Ivan Ivan",
		"dateOfBirth": "2024-12-24T06:22:33.444Z",
		"email": "t21@t.ru",
		"role": "ADMIN",
		"userStatus": true,
		"createdAt": "2026-01-27T06:42:49.224Z",
		"updatedAt": "2026-01-27T06:42:49.224Z"
	},
	"messageSuccess": "Пользователь получен"
}
```

#### 4. Получить всех пользователей

```http
GET /users
```

**Заголовок:**

```
Authorization: Bearer <jwt_token>
```

**Пример curl:**

```bash
curl -X GET http://localhost:4200/api/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Успешный ответ (200):**

```json
{
	"users": [
		{
			"id": 44,
			"name": "Ivan",
			"bio": "Ivan Ivan Ivan",
			"dateOfBirth": "2024-12-24T06:22:33.444Z",
			"email": "t21@t.ru",
			"role": "ADMIN",
			"userStatus": true,
			"createdAt": "2026-01-27T06:42:49.224Z",
			"updatedAt": "2026-01-27T06:42:49.224Z"
		},
		{
			"id": 45,
			"name": "Ivan",
			"bio": "Ivan Ivan Ivan",
			"dateOfBirth": "2024-12-24T06:22:33.444Z",
			"email": "t22222@t.ru",
			"role": "ADMIN",
			"userStatus": true,
			"createdAt": "2026-01-27T06:44:42.659Z",
			"updatedAt": "2026-01-27T06:44:42.659Z"
		}
	],
	"messageSuccess": "Список пользователей получен"
}
```

#### 5. Заблокировать пользователя

```http
PATCH /users/block/:userId
```

**Заголовок:**

```
Authorization: Bearer <jwt_token>
```

**Пример curl:**

```bash
curl -X PATCH http://localhost:4200/api/users/block/2 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Успешный ответ (200):**

```json
{
	"user": {
		"count": 1
	},
	"messageSuccess": "Пользователь разблокирован userId: 46"
}
```

#### 6. Разблокировать пользователя

```http
PATCH /users/unlock/:userId
```

**Заголовок:**

```
Authorization: Bearer <jwt_token>
```

**Пример curl:**

```bash
curl -X PATCH http://localhost:4200/api/users/unlock/2 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Успешный ответ (200):**

```json
{
	"user": {
		"count": 1
	},
	"messageSuccess": "Пользователь разблокирован userId: 46"
}
```

## 🧑‍💼 Модель пользователя

| Поле          | Тип               | Обязательное | Описание                             |
| :------------ | :---------------- | :----------- | :----------------------------------- |
| `id`          | `number`          | Нет          | Уникальный ID                        |
| `name`        | `string`          | ✅ Да        | Имя пользователя                     |
| `bio`         | `string`          | ✅ Да        | Биография                            |
| `dateOfBirth` | `ISO Date String` | ✅ Да        | Дата рождения                        |
| `email`       | `string`          | ✅ Да        | Email (уникальный)                   |
| `password`    | `string`          | ✅ Да        | Пароль (минимум 8 символов)          |
| `role`        | `enum`            | ✅ Да        | `ADMIN`, `USER`                      |
| `userStatus`  | `boolean`         | ✅ Да        | Статус активности (`true` = активен) |

## 🔑 Авторизация

**Все защищенные эндпоинты требуют JWT токен в заголовке:**

```
Authorization: Bearer <jwt_token>
```

**Токен получается после успешной регистрации или логина.**

## 📊 Коды ответов

| Код   | Описание                      |
| :---- | :---------------------------- |
| `200` | Успешный запрос               |
| `201` | Ресурс создан                 |
| `400` | Неверный формат данных        |
| `401` | Не авторизован/неверный токен |
| `403` | Нет доступа (не ADMIN)        |
| `404` | Пользователь не найден        |
| `409` | Email уже зарегистрирован     |
| `500` | Ошибка сервера                |

## 🚀 Быстрый старт

```bash
git clone https://github.com/Uri555459/test-job-express.git

			или

git clone git@github.com:Uri555459/test-job-express.git

cd test-job-express
npm install
npm run build
npm start
```
