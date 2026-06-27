import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('TaskService', () => {
  let service: TaskService;
  let mockTaskRepository: jest.Mocked<Repository<Task>>;

  beforeEach(async () => {
    mockTaskRepository = {
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      preload: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<Repository<Task>>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: 'TaskRepository',
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call save when creating a task', async () => {
    const createTaskDto = { title: 'Test Task', description: 'Test' };
    const expectedTask = { id: 1, ...createTaskDto };

    mockTaskRepository.create.mockReturnValue(createTaskDto as unknown as Task);
    mockTaskRepository.save.mockResolvedValue(expectedTask as unknown as Task);

    const result = await service.create(createTaskDto);

    expect(mockTaskRepository.create).toHaveBeenCalledWith(createTaskDto);
    expect(mockTaskRepository.save).toHaveBeenCalledWith(createTaskDto);
    expect(result).toEqual(expectedTask);
  });

  it('should throw NotFoundException when task not found', async () => {
    mockTaskRepository.findOneBy.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    expect(mockTaskRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should return remove message for delete', async () => {
    mockTaskRepository.delete.mockResolvedValue({ affected: 1 } as any);
    const result = await service.remove(1);
    expect(result.removed).toBe(true);
  });

  it('should call delete with zero id', async () => {
    mockTaskRepository.delete.mockResolvedValue({ affected: 0 } as any);
    const result = await service.remove(0);
    expect(result.removed).toBe(false);
    expect(mockTaskRepository.delete).toHaveBeenCalledWith({ id: 0 });
  });
});
