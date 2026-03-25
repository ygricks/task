import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(createTaskDto);
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.preload({
      id,
      ...dto,
    });

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<{ removed: boolean }> {
    const deleteResult = await this.taskRepository.delete({ id });
    return { removed: Boolean(deleteResult.affected) };
  }
}
