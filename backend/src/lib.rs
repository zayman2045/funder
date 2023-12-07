pub mod instruction;

use instruction::GameInstruction;
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

entrypoint!(process_instruction);

// Current Program Id: 4r6uF3pQgK5aekUiziAYLndX5DCz2NaU3HuvfeBtgiq6
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let game_instruction = GameInstruction::unpack(instruction_data)?;

    match game_instruction {
        GameInstruction::AddGameReview {
            title,
            rating,
            description,
        } => add_game_review(program_id, accounts, title, rating, description),
    }
}

pub fn add_game_review(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    title: String,
    rating: u8,
    description: String,
) -> ProgramResult {
    msg!("Adding movie review...");
    msg!("Title: {}", title);
    msg!("Rating: {}", rating);
    msg!("Description: {}", description);

    Ok(())
}
