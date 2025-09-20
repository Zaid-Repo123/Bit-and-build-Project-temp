# Task Manager - Bit and Build Project

A simple and elegant task management web application built with Node.js, Express.js, and vanilla JavaScript.

![Task Manager Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Task+Manager+App)

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as completed or pending
- ✅ Filter tasks by status (All, Pending, Completed)
- ✅ Real-time task statistics
- ✅ Responsive design for mobile and desktop
- ✅ Modern, clean user interface
- ✅ RESTful API endpoints
- ✅ Input validation and error handling
- ✅ Notifications for user feedback

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Testing**: Jest, Supertest
- **Development**: Nodemon, ESLint
- **Security**: Helmet.js, CORS

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Bit-and-build-Project-temp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload
- `npm test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Check code for linting errors
- `npm run lint:fix` - Fix linting errors automatically

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check server status |

### API Examples

#### Get all tasks
```bash
curl -X GET http://localhost:3000/api/tasks
```

#### Create a new task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js"}'
```

#### Update a task
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

#### Delete a task
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Project Structure

```
├── server.js              # Main server file
├── package.json           # Project dependencies and scripts
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore rules
├── public/               # Static files
│   ├── index.html        # Main HTML file
│   ├── styles.css        # CSS styles
│   └── script.js         # Frontend JavaScript
├── tests/                # Test files
│   └── server.test.js    # API tests
└── README.md             # Project documentation
```

## Development

### Adding New Features

1. Create a new branch for your feature
2. Write tests for the new functionality
3. Implement the feature
4. Run tests to ensure everything works
5. Submit a pull request

### Testing

The project includes comprehensive tests for all API endpoints. Run tests with:

```bash
npm test
```

### Code Quality

The project uses ESLint for code quality. Check your code with:

```bash
npm run lint
```

## Deployment

### Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

### Production Deployment

1. Set environment variables
2. Install production dependencies:
```bash
npm install --production
```
3. Start the server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help, please open an issue in the repository.

---

**Built with ❤️ by the Bit and Build Project Team**