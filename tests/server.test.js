const request = require('supertest');
const app = require('../server');

describe('Task Manager API', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Server is running');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return list of tasks', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const newTask = {
        title: 'Test Task'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('title', 'Test Task');
      expect(response.body.data).toHaveProperty('completed', false);
      expect(response.body.data).toHaveProperty('createdAt');
    });

    it('should reject task without title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Title is required');
    });

    it('should reject task with empty title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: '   ' })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Title is required');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task to Update' });
      taskId = response.body.data.id;
    });

    it('should update task title', async () => {
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({ title: 'Updated Task' })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('title', 'Updated Task');
      expect(response.body.data).toHaveProperty('updatedAt');
    });

    it('should update task completion status', async () => {
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({ completed: true })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('completed', true);
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .put('/api/tasks/9999')
        .send({ title: 'Updated Task' })
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Task not found');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task to Delete' });
      taskId = response.body.data.id;
    });

    it('should delete a task', async () => {
      const response = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('title', 'Task to Delete');

      // Verify task is deleted
      const getResponse = await request(app)
        .get('/api/tasks');
      
      const taskExists = getResponse.body.data.some(task => task.id === taskId);
      expect(taskExists).toBe(false);
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .delete('/api/tasks/9999')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Task not found');
    });
  });

  describe('404 handling', () => {
    it('should return 404 for unknown API routes', async () => {
      const response = await request(app)
        .get('/api/unknown')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'API endpoint not found');
    });
  });
});