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

    // Mock game reviews
    static mocks: Game[] = [
        new Game('The Legend of Zelda: Tears of the Kingdom', 5, `The latest installment in the Zelda franchise is a masterpiece. The story is gripping, the gameplay is smooth, and the graphics are stunning. This is a must-play for any Zelda fan.`),
        new Game('Starfield', 5, `Bethesda's latest game is a masterpiece. Like Skyrim, but in space. Definitely worth the wait.`),
        new Game('Super Mario Bros Wonder', 4, `The latest Mario game is a lot of fun. The new powerups are really cool, and the levels are well-designed. The only downside is that the game is a bit short.`),
        new Game('Final Fantasy XVI', 5, `Easily the best Final Fantasy game since FFVII. It's a return to form for the series, with a great story and characters. The combat is also really fun, and the graphics are stunning.`),
    ]

    // Schema for data being serialized to the blockchain
    borshInstructionSchema = borsh.struct([
        borsh.u8('variant'),
        borsh.str('title'),
        borsh.u8('rating'),
        borsh.str('description'),
      ])

      serialize(): Buffer {
        const buffer = Buffer.alloc(1000)
        this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer)
        return buffer.subarray(0, this.borshInstructionSchema.getSpan(buffer))
      }

      // Schema for data being deserialized from the blockchain
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