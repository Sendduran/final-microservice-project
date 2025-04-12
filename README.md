# 🏫 Student & Room Microservices System

## 🚀 Overview
This project implements a basic microservices architecture using Node.js, PostgreSQL, Docker, and Kubernetes. It includes:

- 🧑‍🎓 Student Service – manages student registration
- 🏠 Room Service – handles room allocation and tracking
- 🗄 PostgreSQL databases for both services
- 📦 Docker & Kubernetes deployment
- 🔁 CI/CD pipeline using GitHub Actions
- 📊 Monitoring with Prometheus & Grafana

---

## 📦 Architecture

Each microservice runs independently:
- Dockerized with its own PostgreSQL database
- Exposes REST APIs
- Prometheus-compatible /metrics endpoints
- Communication via HTTP within Kubernetes

```
                      +-------------------+
                      |  Student Service  |
                      |  /students        |
                      +-------------------+
                               |
                               | HTTP (API Call)
                               v
                      +-------------------+
                      |    Room Service   |
                      |  /rooms           |
                      +-------------------+

Each has its own DB
```

---

## 🧱 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/final-microservice-project.git
cd final-microservice-project
```

### 2. Configure Environment Variables

```bash
cp student-service/.env.example student-service/.env
cp room-service/.env.example room-service/.env
```

Edit `.env` files to match your DB credentials.

### 3. Start with Docker Compose

```bash
docker-compose up -d
```

### 4. Kubernetes Deployment (Optional)

```bash
kubectl apply -f k8s/
kubectl get pods
kubectl get svc
```

---

## 📊 Monitoring

### Port-forward Grafana:

```bash
kubectl port-forward svc/monitoring-grafana -n monitoring 3002:80
```

Visit: [http://localhost:3002](http://localhost:3002)  
Login: `admin / prom-operator`

---

## 🧪 Testing

Each service uses Jest + Supertest.

```bash
cd student-service
npm install
npm test
```

Repeat for `room-service`.

---

## 🚀 CI/CD Pipeline

- Runs on push to main branch
- Executes:
  - Tests
  - Docker builds
  - Kubernetes deployment (via kubectl)

Config file: `.github/workflows/ci-cd.yaml`

Runner: self-hosted GitHub Actions runner (local)

---

## 📬 API Endpoints

### Student Service

- `POST /students` → Register a student
- `GET /students/:id` → Fetch student by ID

### Room Service

- `POST /rooms` → Create a room
- `POST /rooms/allocate` → Assign student to a room
- `GET /rooms/allocations/:student_id` → View allocations

---

## 🙌 Team & Credits

Built by: Sendduran Thailan, Krutika Latkar, Anil Pokhrel , Roma Malla Thakuri  
Course: SOA – Final Project (Seneca College)

---

## 📁 Folder Structure

```
├── student-service/
│   ├── Dockerfile
│   ├── .env
│   └── src/
├── room-service/
│   ├── Dockerfile
│   ├── .env
│   └── src/
├── k8s/
│   ├── *.yaml (Kubernetes manifests)
├── .github/workflows/ci-cd.yaml
└── README.md
```
