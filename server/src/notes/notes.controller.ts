import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll(): Promise<Note[]> {
    return await this.notesService.findAll();
  }

  @Get('/id/:id')
  async findOne(@Param('id') id: string): Promise<Note> {
    return await this.notesService.findOne(id);
  }

  @Get('/list')
  async findListByUser(@Request() req): Promise<Partial<Note>[]> {
    console.log('list!')
    console.log(req.user);
    // return null;
    return await this.notesService.findAllSummarisedByUser(req.user.id);
  }

  @Get('/user')
  async findByUser(@Request() req): Promise<Partial<Note>[]> {
    return await this.notesService.findAllByUser(req.user.id);
  }

  @Post()
  async create(@Body() note: Partial<Note>): Promise<Note> {
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