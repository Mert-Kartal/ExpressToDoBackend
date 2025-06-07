# Express Todo Backend

Bu proje, Express.js ve TypeScript kullanılarak geliştirilmiş bir Todo uygulamasının backend kısmıdır. PostgreSQL veritabanı ve Prisma ORM kullanılmaktadır.

## 🚀 Özellikler

- JWT tabanlı kimlik doğrulama
- Todo CRUD işlemleri
- Kategori yönetimi
- Kullanıcı rolleri (ADMIN ve USER)
- İstatistik ve analiz
- Docker desteği
- Rate limiting
- Güvenlik önlemleri (helmet, cors)

## 📋 Gereksinimler

- Node.js (v20 veya üzeri)
- PostgreSQL
- Docker ve Docker Compose (opsiyonel)

## 🛠️ Kurulum

### Docker ile Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/Mert-Kartal/ExpressToDoBackend.git
cd ExpressToDoBackend
```

2. Docker container'larını başlatın:
```bash
docker-compose up --build
```

3. Veritabanı migration'larını çalıştırın:
```bash
docker-compose exec app npx prisma migrate dev
```

### Manuel Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/Mert-Kartal/ExpressToDoBackend.git
cd ExpressToDoBackend/api
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tododb?schema=public"
JWT_SECRET="your-secret-key"
```

4. Veritabanı migration'larını çalıştırın:
```bash
npx prisma migrate dev
```

5. Uygulamayı başlatın:
```bash
npm run dev
```

## 📚 API Rotaları

### Kimlik Doğrulama

#### Kayıt Ol
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "password": "password123",
  "verifyPassword": "password123"
}
```

Validasyon Kuralları:
- name: 1-100 karakter
- username: 1-100 karakter
- password: 8-16 karakter
- verifyPassword: password ile eşleşmeli

Hata Yanıtı:
```json
{
  "error": "Validation Error",
  "details": [
    {
      "path": ["password"],
      "message": "password is too short"
    }
  ]
}
```

#### Giriş Yap
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

Validasyon Kuralları:
- username: 1-100 karakter
- password: 8-16 karakter

Hata Yanıtı:
```json
{
  "error": "Invalid credentials"
}
```

### Todo İşlemleri

#### Todo Listele
```http
GET /api/todos
Authorization: Bearer <token>
```

#### Todo Ara
```http
GET /api/todos/search?q=arama_terimi
Authorization: Bearer <token>
```

#### Tekil Todo Getir
```http
GET /api/todos/:id
Authorization: Bearer <token>
```

#### Todo Oluştur
```http
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Yeni Todo",
  "description": "Todo açıklaması",
  "priority": "HIGH",
  "dueDate": "2024-03-01T00:00:00.000Z"
}
```

Validasyon Kuralları:
- title: 1-100 karakter
- description: 1-500 karakter (opsiyonel)
- priority: LOW, MEDIUM, HIGH
- dueDate: Gelecek bir tarih olmalı

Hata Yanıtı:
```json
{
  "error": "Validation Error",
  "details": [
    {
      "path": ["dueDate"],
      "message": "Due date must be in the future"
    }
  ]
}
```

#### Todo Güncelle
```http
PUT /api/todos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Güncellenmiş Todo",
  "description": "Yeni açıklama",
  "priority": "MEDIUM",
  "dueDate": "2024-03-02T00:00:00.000Z"
}
```

Validasyon Kuralları:
- En az bir alan güncellenmeli
- Tüm alanlar opsiyonel
- dueDate: Gelecek bir tarih olmalı

#### Todo Durumunu Güncelle
```http
PATCH /api/todos/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

Geçerli Durumlar:
- PENDING
- IN_PROGRESS
- COMPLETED
- CANCELLED

#### Todo Sil
```http
DELETE /api/todos/:id
Authorization: Bearer <token>
```

#### Todo Kategorilerini Getir
```http
GET /api/todos/:id/categories
Authorization: Bearer <token>
```

#### Todo Kategorisi Ekle
```http
POST /api/todos/:id/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "categoryId": "category-id-1"
}
```

#### Todo Kategorisi Sil
```http
DELETE /api/todos/:id/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "categoryId": "category-id-1"
}
```

### Kategori İşlemleri

#### Kategori Listele
```http
GET /api/categories
Authorization: Bearer <token>
```

#### Tekil Kategori Getir
```http
GET /api/categories/:id
Authorization: Bearer <token>
```

#### Kategori Todo'larını Getir
```http
GET /api/categories/:id/todos
Authorization: Bearer <token>
```

#### Kategori Oluştur (Admin)
```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "İş",
  "color": "#FF0000"
}
```

Validasyon Kuralları:
- name: 1-100 karakter
- color: 4-7 karakter (hex format)

Hata Yanıtı:
```json
{
  "error": "Unauthorized",
  "message": "Admin privileges required"
}
```

#### Kategori Güncelle (Admin)
```http
PUT /api/categories/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Güncellenmiş Kategori",
  "color": "#00FF00"
}
```

#### Kategori Sil (Admin)
```http
DELETE /api/categories/:id
Authorization: Bearer <token>
```

### İstatistikler

#### Todo İstatistikleri
```http
GET /api/stats/todos
Authorization: Bearer <token>
```

Yanıt:
```json
{
  "total": 10,
  "completed": 5,
  "pending": 3,
  "inProgress": 2,
  "byPriority": {
    "HIGH": 4,
    "MEDIUM": 4,
    "LOW": 2
  }
}
```

#### Öncelik İstatistikleri
```http
GET /api/stats/priorities
Authorization: Bearer <token>
```

Yanıt:
```json
{
  "HIGH": 4,
  "MEDIUM": 4,
  "LOW": 2
}
```

### Kullanıcı İşlemleri

#### Profil Bilgilerini Getir
```http
GET /api/users/me
Authorization: Bearer <token>
```

#### Tüm Kullanıcıları Listele (Admin)
```http
GET /api/users
Authorization: Bearer <token>
```

#### Kullanıcı Detayı Getir 
```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Kullanıcı Oluştur (Admin)
```http
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Yeni Kullanıcı",
  "username": "yenikullanici",
  "password": "password123",
  "role": "USER"
}
```

#### Profil Güncelle
```http
PATCH /api/users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Güncellenmiş İsim",
  "password": "yenipassword"
}
```

#### Kullanıcı Güncelle (Admin)
```http
PATCH /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Güncellenmiş İsim",
  "role": "ADMIN"
}
```

#### Profil Sil
```http
DELETE /api/users/me
Authorization: Bearer <token>
```

#### Kullanıcı Sil (Admin)
```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

## 🔒 Güvenlik

- JWT tabanlı kimlik doğrulama
- Rate limiting (auth: 20 istek/15 dakika, global: 100 istek/15 dakika)
- Helmet güvenlik başlıkları
- CORS koruması
- Şifre hashleme (bcrypt)

## 📊 Veritabanı Şeması

### User
- id: UUID
- name: String
- username: String (unique)
- password: String
- role: Enum (ADMIN, USER)
- createdAt: DateTime
- updatedAt: DateTime
- deletedAt: DateTime?
- todos: Todo[] (relation)

### Todo
- id: UUID
- userId: UUID (foreign key)
- title: String
- description: String?
- status: Enum (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)
- priority: Enum (LOW, MEDIUM, HIGH)
- dueDate: DateTime
- createdAt: DateTime
- updatedAt: DateTime
- deletedAt: DateTime?
- user: User (relation)
- categories: TodoCategory[] (relation)

### Category
- id: UUID
- name: String (unique)
- color: String
- createdAt: DateTime
- updatedAt: DateTime
- todos: TodoCategory[] (relation)

### TodoCategory (Junction Table)
- todoId: UUID (foreign key)
- categoryId: UUID (foreign key)
- Todo: Todo (relation)
- Category: Category (relation)
- Unique constraint on [todoId, categoryId]

## 🐳 Docker

Docker yapılandırması şunları içerir:
- Node.js uygulaması için container
- PostgreSQL veritabanı için container
- Resource limits:
  - CPU: 0.5 core limit, 0.25 core reservation
  - Memory: 512MB limit, 256MB reservation
- Volume yönetimi:
  - Uygulama kodu için bind mount
  - PostgreSQL verileri için named volume
- Network izolasyonu:
  - Bridge network: todo-network
- Otomatik yeniden başlatma (unless-stopped)

## 📝 Geliştirme

### Yeni Migration Oluşturma
```bash
npx prisma migrate dev --name migration_name
```

### Prisma Client Güncelleme
```bash
npx prisma generate
```

### Seed Verisi Ekleme
```bash
npx prisma db seed
```

## 🔍 Hata Ayıklama

### Logları Görüntüleme
```bash
docker-compose logs -f
```

### Container'a Bağlanma
```bash
docker-compose exec app sh
```

## 📈 Performans

- Rate limiting ile aşırı yüklenme önleme
- Resource limits ile kaynak kullanımı kontrolü
- Veritabanı indeksleme
- Soft delete ile veri bütünlüğü

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın. 

### Hata Kodları

- 400: Bad Request (Validasyon hatası)
- 401: Unauthorized (Token eksik/geçersiz)
- 403: Forbidden (Yetkisiz erişim)
- 404: Not Found (Kaynak bulunamadı)
- 429: Too Many Requests (Rate limit aşıldı)
- 500: Internal Server Error

### Rate Limiting

- Auth rotaları: 20 istek/15 dakika
- Global limit: 100 istek/15 dakika

### Güvenlik

- JWT token formatı: `Bearer <token>`
- Token süresi: 24 saat
- Şifre hashleme: bcrypt
- CORS: Tüm originlere açık
- Helmet: Güvenlik başlıkları aktif 