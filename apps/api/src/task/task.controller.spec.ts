import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

const mockTask = { id: 1, title: 'Test Task', description: 'Test description' };

describe('TaskController', () => {
  let controller: TaskController;
  let taskService: jest.Mocked<TaskService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockTask),
            update: jest.fn().mockResolvedValue(mockTask),
            findOne: jest.fn().mockResolvedValue(mockTask),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    taskService = module.get(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task via taskService.create', async () => {
      const dto = { title: 'Test Task', description: 'Test description' };
      const result = await controller.create(dto as any);

      expect(result).toEqual(mockTask);
      expect(taskService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should return a task via taskService.findOne', async () => {
      const result = await controller.findOne('1');

      expect(result).toEqual(mockTask);
      expect(taskService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should return updated task via taskService.update', async () => {
      const dto = { title: 'Updated Task', description: 'Updated description' };
      const result = await controller.update('1', dto as any);

      expect(result).toEqual(mockTask);
      expect(taskService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should call taskService.remove with numeric id', async () => {
      const result = await controller.remove('1');

      expect(result).toBeUndefined();
      expect(taskService.remove).toHaveBeenCalledWith(1);
    });
  });
});
