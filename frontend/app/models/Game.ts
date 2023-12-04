import * as borsh from '@project-serum/borsh'

export class Game {
    title: string;
    rating: number;
    description: string;

    constructor(title: string, rating: number, description: string) {
        this.title = title;
        this.rating = rating;
        this.description = description;
    }

    // Schema for data being serialized to the back end
    borshInstructionSchema = borsh.struct([
        borsh.u8('variant'),
        borsh.str('title'),
        borsh.u8('rating'),
        borsh.str('description'),
      ])

      serialize(): Buffer {
        const buffer = Buffer.alloc(1000)
        this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer) // variant 0 = create
        return buffer.subarray(0, this.borshInstructionSchema.getSpan(buffer))
      }

      // Schema for data being deserialized from the back end
      static borshAccountSchema = borsh.struct([
        borsh.bool('initialized'),
        borsh.u8('rating'),
        borsh.str('title'),
        borsh.str('description'),
      ])

      static deserialize(buffer?: Buffer): Game|null {
        if (!buffer) {
          return null
        }
    
        try {
          const { title, rating, description } = this.borshAccountSchema.decode(buffer)
          return new Game(title, rating, description)
        } catch(error) {
          console.log('Deserialization error:', error)
          return null
        }
      }
}