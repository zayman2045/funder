//! Handles instructions for the game review program

use borsh::BorshDeserialize;
use solana_program::program_error::ProgramError;

/// Instructions that can be executed by the game review program.
pub enum GameInstruction {
    AddGameReview {
        title: String,
        rating: u8,
        description: String
    }
}

impl GameInstruction {
    /// Unpacks the borsh serialized vector.
    pub fn unpack(byte_array: &[u8]) -> Result<Self, ProgramError> {

        // Split the first byte to separate the variant from the payload
        let (variant, rest) = byte_array.split_first().ok_or(ProgramError::InvalidInstructionData)?;
        let payload = GameReviewPayload::try_from_slice(rest).expect("Failed to deserialize byte array");

        // Match the variant and return the proper instruction
        Ok(match variant {
            0 => Self::AddGameReview { title: payload.title, rating: payload.rating, description: payload.description },
            _ => return Err(ProgramError::InvalidInstructionData)
        })
    }
}

/// Internal struct used to deserialize the payload
#[derive(BorshDeserialize)]
struct GameReviewPayload {
    title: String,
    rating: u8,
    description: String
}