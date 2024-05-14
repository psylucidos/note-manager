import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Note[]> {
    return await this.notesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<Note> {
    return await this.notesService.findOne(id);
  }

  @Get('/list/user/')
  @UseGuards(AuthGuard('jwt'))
  async findListByUser(@Request() req): Promise<Partial<Note>[]> {
    return await this.notesService.findAllByUser(req.user.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() note: Partial<Note>): Promise<Note> {
    return await this.notesService.create(note);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() note: Note): Promise<Note> {
    return await this.notesService.update(id, note);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string): Promise<void> {
    return await this.notesService.delete(id);
  }
}