// Input piece + destination e.g. [A1, B2]
// Validate move
    // Find piece
    // FOUND PIECE
        // Is occupied?
            // IF OCCUPIED 
                // Can claim?
                    // IF TRUE
                        // MOVE = TRUE
                    // IF FALSE
                        // MOVE = FALSE
            // IF !OCCUPIED
                // Can move?
                    // IF TRUE
                        // MOVE = TRUE
                    // IF FALSE
                        // MOVE = FALSE
    // !FOUND PIECE
        // MOVE = FALSE

// IF !MOVE
    // Display error message
// IF MOVE
    // Move piece in board
    // Update board
    // Print new board
    // Update turn
    // Print update