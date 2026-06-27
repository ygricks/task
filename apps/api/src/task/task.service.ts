import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(task: Partial<Task>): Promise<Task> {
    this.taskRepository.create(task);
    return this.taskRepository.save(task);
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return Promise.resolve(task);
  }

  async getLast(createdBy: number): Promise<Task[]> {
    return await this.taskRepository.createQueryBuilder('tasks')
      .where("tasks.created_by = :id", { id: createdBy })
      .orderBy('tasks.updated_at','DESC')
      .limit(10)
      .getMany();
  }

  async findAll(createdBy: number): Promise<Task[]> {
    return await this.taskRepository.findBy({ createdBy });
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.preload({
      id,
      ...dto,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<{ removed: boolean }> {
    const deleteResult = await this.taskRepository.delete({ id });
    return { removed: Boolean(deleteResult.affected) };
  }
}
