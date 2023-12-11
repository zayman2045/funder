pub mod instruction;
pub mod state;

use borsh::BorshSerialize;
use instruction::GameInstruction;
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::invoke_signed,
    program_error::ProgramError,
    pubkey::Pubkey,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
};
use state::GameAccountState;
use std::convert::TryInto;

entrypoint!(process_instruction);

// Replaces solana_program::borsh0_10::try_from_slice_unchecked which depends on an old version of borsh
pub fn try_from_slice_unchecked<T: borsh::BorshDeserialize>(
    data: &[u8],
) -> Result<T, ProgramError> {
    let mut data_mut = data;
    match T::deserialize(&mut data_mut) {
        Ok(result) => Ok(result),
        Err(_) => Err(ProgramError::InvalidInstructionData),
    }
}

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
    msg!("Adding game review...");
    msg!("Title: {}", title);
    msg!("Rating: {}", rating);
    msg!("Description: {}", description);
    msg!("Program ID: {}", program_id);
    msg!("Accounts: {:?}", accounts);

    let account_info_iter = &mut accounts.iter();
    let initializer = next_account_info(account_info_iter)?;
    let pda_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    // Derive the PDA for this review
    let (pda, bump_seed) = Pubkey::find_program_address(
        &[initializer.key.as_ref(), title.as_bytes().as_ref()],
        program_id,
    );

    // Calculate the rent required
    let account_len: usize = 1 + 1 + (4 + title.len()) + (4 + description.len());
    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(account_len);

    // Create the account through a CPI to the system program
    invoke_signed(
        &system_instruction::create_account(
            initializer.key,
            pda_account.key,
            rent_lamports,
            account_len.try_into().unwrap(),
            program_id,
        ),
        &[
            initializer.clone(),
            pda_account.clone(),
            system_program.clone(),
        ],
        &[&[
            initializer.key.as_ref(),
            title.as_bytes().as_ref(),
            &[bump_seed],
        ]],
    )?;

    msg!("PDA created: {}", pda);

    // Deserialize, update and serialize account data
    msg!("unpacking state account");
    let mut account_data =
        try_from_slice_unchecked::<GameAccountState>(&pda_account.data.borrow()).unwrap();
    msg!("borrowed account data");

    account_data.title = title;
    account_data.rating = rating;
    account_data.description = description;
    account_data.is_initialized = true;

    msg!("serializing account");
    account_data.serialize(&mut &mut pda_account.data.borrow_mut()[..])?;
    msg!("state account serialized");

    Ok(())
}
