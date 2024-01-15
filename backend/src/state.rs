//! Defines the state of the game review account.

use borsh::{BorshDeserialize, BorshSerialize};

/// The state of the game review account.
#[derive(BorshSerialize, BorshDeserialize)]
pub struct GameAccountState {
    pub is_initialized: bool,
    pub rating: u8,
    pub title: String,
    pub description: String,
}
