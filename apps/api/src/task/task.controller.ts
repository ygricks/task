import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ActiveUser } from 'src/auth/activeUser.decorator';
import { Task } from './entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @ActiveUser('sub') userId: number,
  ) {
    const createdTask = await this.taskService.create({
      ...createTaskDto,
      createdBy: userId,
    });
    return createdTask;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @ActiveUser('sub') userId: number,
  ): Promise<Task> {
    const task = await this.taskService.findOne(+id);

    if (task.createdBy !== userId) {
      throw new ForbiddenException();
    }
    return await this.taskService.update(+id, updateTaskDto);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @ActiveUser('sub') userId: number,
  ): Promise<Task> {
    const task = await this.taskService.findOne(+id);
    if (task.createdBy !== userId) {
      throw new ForbiddenException();
    }
    return task;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ActiveUser('sub') userId: number) {
    const task = await this.taskService.findOne(+id);
    if (task.createdBy !== userId) {
      throw new ForbiddenException();
    }
    return this.taskService.remove(+id);
  }
}
