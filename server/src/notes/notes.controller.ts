import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll(): Promise<Note[]> {
    return await this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Note> {
    return await this.notesService.findOne(id);
  }

  @Post()
  async create(@Body() note: Note): Promise<Note> {
    return await this.notesService.create(note);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() note: Note): Promise<Note> {
    return await this.notesService.update(id, note);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.notesService.delete(id);
  }
}