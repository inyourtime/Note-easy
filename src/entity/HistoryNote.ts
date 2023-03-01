import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne } from "typeorm"
import { Note } from "./Note"

@Entity()
export class HistoryNote {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    version: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date

    @ManyToOne(() => Note, (note) => note.history_notes)
    note: Note
}