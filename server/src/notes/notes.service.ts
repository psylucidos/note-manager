import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    return await this.noteRepository.find();
  }

  async findOne(id: string): Promise<Note> {
    return await this.noteRepository.findOneBy({ id });
  }

  async findAllByUser(userId: string): Promise<Partial<Note>[]> {
    return await this.noteRepository.find({
      where: { user: { id: userId } },
      select: {
        id: true,
        title: true,
        content: true,
      },
    }).then((notes) => {
      return notes.map((note) => ({
        id: note.id,
        title: note.title,
        content: note.content.substring(0, 20),
      }));
    });
  }

  async create(note: Partial<Note>): Promise<Note> {
    return await this.noteRepository.save(note);
  }

  async update(id: string, note: Note): Promise<Note> {
    const existingNote = await this.noteRepository.findOneBy({ id });
    if (!existingNote) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    existingNote.title = note.title;
    existingNote.content = note.content;
    return await this.noteRepository.save(existingNote);
  }

  async delete(id: string): Promise<void> {
    await this.noteRepository.delete(id);
  }
}